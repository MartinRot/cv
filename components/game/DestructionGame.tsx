"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import confetti from "canvas-confetti";
import { sound } from "@/lib/sound";
import { TouchControls } from "./TouchControls";
import { Language } from "@/types/cv";
import { UI_TRANSLATIONS } from "@/data/cv-data";
import {
  Volume2,
  VolumeX,
  RotateCcw,
  X,
  Sparkles,
  Crosshair,
  Flame,
  Wrench,
  Rocket
} from "lucide-react";

interface DestructionGameProps {
  isActive: boolean;
  lang: Language;
  onClose: () => void;
  destroyedElements: Set<string>;
  onElementDamage: (id: string, damage: number) => void;
  onResetAll: () => void;
}

interface Projectile {
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: "laser" | "rocket" | "hammer";
  life: number;
  radius: number;
  angle: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  life: number;
  maxLife: number;
  text?: string;
}

interface LootItem {
  id: string;
  x: number;
  y: number;
  vy: number;
  label: string;
  collected: boolean;
  value: number;
}

interface FloatingText {
  id: number;
  x: number;
  y: number;
  text: string;
  color: string;
  life: number;
}

const CODE_SNIPPETS = ["<div/>", "TS", "Next.js", "React 19", "{}", "Tailwind", "Firebase", "404", "BUG FIX", "const", "return;"];

export function DestructionGame({
  isActive,
  lang,
  onClose,
  destroyedElements,
  onElementDamage,
  onResetAll
}: DestructionGameProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Synchronized refs to avoid re-triggering the game loop and resetting the player!
  const destroyedElementsRef = useRef(destroyedElements);
  destroyedElementsRef.current = destroyedElements;

  const onElementDamageRef = useRef(onElementDamage);
  onElementDamageRef.current = onElementDamage;

  const langRef = useRef(lang);
  langRef.current = lang;

  // Game State
  const [score, setScore] = useState(0);
  const [selectedWeapon, setSelectedWeapon] = useState<"laser" | "rocket" | "hammer">("laser");
  const selectedWeaponRef = useRef(selectedWeapon);
  selectedWeaponRef.current = selectedWeapon;

  const [isMuted, setIsMuted] = useState(false);
  const [message, setMessage] = useState<string | null>(
    lang === "es"
      ? "¡Usa [A][D] para moverte, [W]/[Espacio] saltar, [S]/[↓] bajar tarjetas o scrollear y Click para disparar!"
      : "Use [A][D] to move, [W]/[Space] to jump, [S]/[↓] to drop down/scroll, and Click to shoot!"
  );

  // Player physics with Double Jump and Jetpack
  const playerRef = useRef({
    x: 200,
    y: 100,
    vx: 0,
    vy: 0,
    width: 28,
    height: 42,
    isGrounded: false,
    jumpsLeft: 2, // Allows Double Jump!
    jetpackFuel: 45, // Hover propellant
    facing: 1, // 1: right, -1: left
    animFrame: 0,
    shootCooldown: 0,
    jumpKeyHeld: false
  });

  const hasSpawnedRef = useRef(false);
  const dropThroughTimerRef = useRef(0);

  // Controls state
  const keysRef = useRef<{ [key: string]: boolean }>({});
  const mouseRef = useRef({ x: 300, y: 300, isDown: false });

  // Game entities
  const projectilesRef = useRef<Projectile[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const lootRef = useRef<LootItem[]>([]);
  const floatingTextsRef = useRef<FloatingText[]>([]);
  const screenShakeRef = useRef(0);

  // Clear notification timer
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(null), 5500);
    return () => clearTimeout(timer);
  }, [message]);

  // Audio mute toggle
  const toggleMute = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    sound.setMuted(nextState);
  };

  // Spawn Floating Text
  const addFloatingText = useCallback((x: number, y: number, text: string, color = "#10b981") => {
    floatingTextsRef.current.push({
      id: Math.random(),
      x,
      y,
      text,
      color,
      life: 1.0
    });
  }, []);

  // Spawn Particle Explosion
  const createExplosion = useCallback((x: number, y: number, count = 25, color = "#f97316") => {
    screenShakeRef.current = 10;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 2;
      const snippet = Math.random() > 0.6 ? CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)] : undefined;

      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        color: snippet ? "#38bdf8" : (Math.random() > 0.5 ? color : "#fbbf24"),
        size: snippet ? 12 : Math.random() * 6 + 3,
        life: 1.0,
        maxLife: 1.0,
        text: snippet
      });
    }
  }, []);

  // Jump Action (Handles First Jump and Double Jump)
  const triggerJump = useCallback(() => {
    const player = playerRef.current;

    if (player.isGrounded) {
      // First jump (Powerful leap)
      player.vy = -14.5;
      player.isGrounded = false;
      player.jumpsLeft = 1;
      sound.playJump();

      // Dust effect under feet
      for (let i = 0; i < 5; i++) {
        particlesRef.current.push({
          x: player.x + player.width / 2,
          y: player.y + player.height,
          vx: (Math.random() - 0.5) * 5,
          vy: -Math.random() * 2,
          color: "#94a3b8",
          size: 3,
          life: 0.5,
          maxLife: 0.5
        });
      }
    } else if (player.jumpsLeft > 0) {
      // DOUBLE JUMP!
      player.vy = -13.5;
      player.jumpsLeft--;
      sound.playJump();

      addFloatingText(
        player.x - 10,
        player.y - 12,
        langRef.current === "es" ? "✨ ¡DOBLE SALTO!" : "✨ DOUBLE JUMP!",
        "#38bdf8"
      );

      // Ring of bright energy particles
      for (let i = 0; i < 10; i++) {
        const angle = Math.random() * Math.PI * 2;
        particlesRef.current.push({
          x: player.x + player.width / 2,
          y: player.y + player.height,
          vx: Math.cos(angle) * 4,
          vy: Math.sin(angle) * 3 + 2,
          color: "#38bdf8",
          size: 4,
          life: 0.45,
          maxLife: 0.45
        });
      }
    }
  }, [addFloatingText]);

  // Super Boost (Rocket jump straight up)
  const triggerSuperBoost = useCallback(() => {
    const player = playerRef.current;
    player.vy = -19.0;
    player.isGrounded = false;
    player.jumpsLeft = 1;
    player.jetpackFuel = 45;
    sound.playRocket();

    addFloatingText(
      player.x - 15,
      player.y - 15,
      langRef.current === "es" ? "🚀 ¡SUPER IMPULSO!" : "🚀 SUPER BOOST!",
      "#f97316"
    );

    // Blast effect
    for (let i = 0; i < 16; i++) {
      particlesRef.current.push({
        x: player.x + player.width / 2,
        y: player.y + player.height,
        vx: (Math.random() - 0.5) * 6,
        vy: Math.random() * 5 + 3,
        color: Math.random() > 0.5 ? "#f97316" : "#fbbf24",
        size: 5,
        life: 0.5,
        maxLife: 0.5
      });
    }
  }, [addFloatingText]);

  // Drop Down / Fast Fall Action
  const triggerDropDown = useCallback(() => {
    const player = playerRef.current;
    dropThroughTimerRef.current = 16;
    player.isGrounded = false;
    player.y += 6;
    player.vy = Math.max(player.vy, 6);

    // Dust effect under feet
    for (let i = 0; i < 6; i++) {
      particlesRef.current.push({
        x: player.x + player.width / 2 + (Math.random() - 0.5) * 12,
        y: player.y + player.height,
        vx: (Math.random() - 0.5) * 4,
        vy: -Math.random() * 2 - 1,
        color: "#94a3b8",
        size: 3,
        life: 0.35,
        maxLife: 0.35
      });
    }
  }, []);

  // Shoot Weapon
  const shoot = useCallback(() => {
    const player = playerRef.current;
    const mouse = mouseRef.current;
    const currentWeapon = selectedWeaponRef.current;

    const originX = player.x + (player.facing === 1 ? player.width : 0);
    const originY = player.y + player.height * 0.45;

    const dx = mouse.x - originX;
    const dy = mouse.y - originY;
    const angle = Math.atan2(dy, dx);

    if (currentWeapon === "laser") {
      sound.playLaser();
      const speed = 18;
      projectilesRef.current.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        type: "laser",
        life: 120,
        radius: 4,
        angle
      });
      player.shootCooldown = 11;
    } else if (currentWeapon === "rocket") {
      sound.playRocket();
      const speed = 11;
      projectilesRef.current.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        type: "rocket",
        life: 180,
        radius: 8,
        angle
      });
      player.shootCooldown = 30;
    } else if (currentWeapon === "hammer") {
      sound.playSmash();
      // Melee shockwave
      createExplosion(originX + Math.cos(angle) * 45, originY + Math.sin(angle) * 45, 12, "#ec4899");
      projectilesRef.current.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * 8,
        vy: Math.sin(angle) * 8,
        type: "hammer",
        life: 10,
        radius: 28,
        angle
      });
      player.shootCooldown = 20;
    }
  }, [createExplosion]);

  // Keyboard handlers
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid scrolling when pressing space or arrows inside game
      if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)) {
        e.preventDefault();
      }

      // Check if jump key was just pressed (for single/double jump edge trigger)
      const isJumpKey = e.code === "Space" || e.code === "KeyW" || e.code === "ArrowUp";
      if (isJumpKey && !keysRef.current[e.code]) {
        triggerJump();
      }

      // Check if drop down key was just pressed
      const isDownKey = e.code === "KeyS" || e.code === "ArrowDown";
      if (isDownKey && !keysRef.current[e.code]) {
        triggerDropDown();
      }

      keysRef.current[e.code] = true;
      if (isJumpKey) {
        playerRef.current.jumpKeyHeld = true;
      }

      // Hotkeys
      if (e.key === "1") setSelectedWeapon("laser");
      if (e.key === "2") setSelectedWeapon("rocket");
      if (e.key === "3") setSelectedWeapon("hammer");
      if (e.key.toLowerCase() === "r" || e.key === "Shift") triggerSuperBoost();
      if (e.key.toLowerCase() === "m") toggleMute();
      if (e.key === "Escape") onClose();
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.code] = false;
      const isJumpKey = e.code === "Space" || e.code === "KeyW" || e.code === "ArrowUp";
      if (isJumpKey) {
        playerRef.current.jumpKeyHeld = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isActive, isMuted, onClose, triggerJump, triggerDropDown, triggerSuperBoost]);

  // Mouse aim and selection prevention handlers
  useEffect(() => {
    if (!isActive) return;

    // Disable text selection and dragging across the page during Chaos Mode
    const originalUserSelect = document.body.style.userSelect;
    const originalWebkitUserSelect = (document.body.style as unknown as { webkitUserSelect: string }).webkitUserSelect;
    document.body.style.userSelect = "none";
    (document.body.style as unknown as { webkitUserSelect: string }).webkitUserSelect = "none";
    document.body.classList.add("select-none");

    // Clear any existing active text selection
    window.getSelection()?.removeAllRanges();

    const handleSelectStart = (e: Event) => {
      e.preventDefault();
    };

    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
    };

    document.addEventListener("selectstart", handleSelectStart);
    document.addEventListener("dragstart", handleDragStart);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 0) {
        mouseRef.current.isDown = true;
        // Don't prevent default on HUD interactive buttons/links
        const target = e.target as HTMLElement | null;
        const isHudInteractive = target?.closest('button, [role="button"], a');
        if (!isHudInteractive) {
          e.preventDefault();
        }
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (e.button === 0) {
        mouseRef.current.isDown = false;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.body.style.userSelect = originalUserSelect;
      (document.body.style as unknown as { webkitUserSelect: string }).webkitUserSelect = originalWebkitUserSelect;
      document.body.classList.remove("select-none");

      document.removeEventListener("selectstart", handleSelectStart);
      document.removeEventListener("dragstart", handleDragStart);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isActive]);

  // Reset / Repair Handler
  const handleRepairAll = () => {
    sound.playRepair();
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 }
    });
    onResetAll();
    setScore(0);
    lootRef.current = [];
    projectilesRef.current = [];
    particlesRef.current = [];
    setMessage(UI_TRANSLATIONS.game.repairedToast[langRef.current]);
  };

  // Main Loop - Depends ONLY on isActive! No player resets on damage/weapon change!
  useEffect(() => {
    if (!isActive) {
      hasSpawnedRef.current = false;
      return;
    }

    let animationFrameId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initial player drop position ONLY when the game is first activated
    if (!hasSpawnedRef.current) {
      playerRef.current.x = window.innerWidth / 2 - 14;
      playerRef.current.y = 80;
      playerRef.current.vx = 0;
      playerRef.current.vy = 0;
      playerRef.current.jumpsLeft = 2;
      playerRef.current.jetpackFuel = 45;
      hasSpawnedRef.current = true;
    }

    const gameLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Handle Screen Shake
      if (screenShakeRef.current > 0) {
        const shakeX = (Math.random() - 0.5) * screenShakeRef.current;
        const shakeY = (Math.random() - 0.5) * screenShakeRef.current;
        ctx.save();
        ctx.translate(shakeX, shakeY);
        screenShakeRef.current = Math.max(0, screenShakeRef.current - 0.8);
      } else {
        ctx.save();
      }

      // Collect all solid platforms: destructibles, tech chips, buttons, badges, links & headings
      const platformNodes = document.querySelectorAll<HTMLElement>(
        'main [data-destructible="true"], main [data-platform="true"], main button, main a.inline-flex, main h2, main h3'
      );
      const platforms: {
        id: string;
        rect: DOMRect;
        isDestroyed: boolean;
        isDestructible: boolean;
      }[] = [];

      platformNodes.forEach((node) => {
        const id = node.getAttribute("data-destructible-id") || "";
        const isDestructible = node.hasAttribute("data-destructible");
        const isDestroyed = isDestructible && destroyedElementsRef.current.has(id);

        // Check if ancestor card is destroyed
        const parentCard = node.closest('[data-destructible="true"]');
        const parentDestroyed =
          parentCard && parentCard !== node
            ? destroyedElementsRef.current.has(parentCard.getAttribute("data-destructible-id") || "")
            : false;

        if (isDestroyed || parentDestroyed) return;

        const rect = node.getBoundingClientRect();

        // Only include platforms with reasonable width/height near viewport and not jammed above ceiling
        if (
          rect.width >= 20 &&
          rect.height >= 10 &&
          rect.top >= 25 &&
          rect.bottom > -80 &&
          rect.top < window.innerHeight + 80
        ) {
          platforms.push({ id, rect, isDestroyed, isDestructible });
        }
      });

      // 1. UPDATE PLAYER PHYSICS
      const player = playerRef.current;
      const keys = keysRef.current;

      // Horizontal and Vertical movement
      const moveLeft = keys["KeyA"] || keys["ArrowLeft"];
      const moveRight = keys["KeyD"] || keys["ArrowRight"];
      const moveDown = keys["KeyS"] || keys["ArrowDown"];

      const accel = 1.3;
      const maxSpeed = 5.8;
      const friction = 0.82;

      if (moveLeft) {
        player.vx = Math.max(player.vx - accel, -maxSpeed);
        player.facing = -1;
        player.animFrame += 0.25;
      } else if (moveRight) {
        player.vx = Math.min(player.vx + accel, maxSpeed);
        player.facing = 1;
        player.animFrame += 0.25;
      } else {
        player.vx *= friction;
        if (Math.abs(player.vx) < 0.1) player.vx = 0;
      }

      // Fast fall / plunge when holding Down in mid-air
      if (moveDown) {
        player.vy = Math.min(player.vy + 1.2, 15);
        if (Math.random() > 0.4) {
          particlesRef.current.push({
            x: player.x + player.width / 2 + (Math.random() - 0.5) * 8,
            y: player.y + 4,
            vx: (Math.random() - 0.5) * 2,
            vy: -Math.random() * 2 - 1,
            color: "#94a3b8",
            size: 2.5,
            life: 0.2,
            maxLife: 0.2
          });
        }
      }

      // Jetpack / Hover thruster when holding jump in mid-air (only when not intentionally holding Down)
      if (!moveDown && player.jumpKeyHeld && !player.isGrounded && player.vy > -5 && player.jetpackFuel > 0) {
        player.vy -= 0.65;
        player.jetpackFuel--;

        // Flame sparks under boots
        if (Math.random() > 0.3) {
          particlesRef.current.push({
            x: player.x + (player.facing === 1 ? 8 : 16) + (Math.random() - 0.5) * 6,
            y: player.y + player.height - 2,
            vx: (Math.random() - 0.5) * 2,
            vy: Math.random() * 3 + 2,
            color: Math.random() > 0.5 ? "#f97316" : "#fbbf24",
            size: Math.random() * 4 + 2,
            life: 0.3,
            maxLife: 0.3
          });
        }
      }

      // Gravity
      player.vy += 0.52;
      if (player.vy > 14) player.vy = 14;

      // Proposed next position
      const nextX = player.x + player.vx;
      const nextY = player.y + player.vy;

      // Platform Collisions (Stand on top of solid cards, chips, buttons, and badges)
      player.isGrounded = false;
      let landedPlatform: typeof platforms[0] | null = null;
      let highestLandingY = Infinity;

      // Countdown drop-through timer
      if (dropThroughTimerRef.current > 0) {
        dropThroughTimerRef.current--;
      }

      // Allow landing only when not holding Down and not in drop-through cooldown
      const canLandOnPlatforms = !moveDown && dropThroughTimerRef.current <= 0;

      if (canLandOnPlatforms) {
        for (const p of platforms) {
          const pTop = p.rect.top;
          const pLeft = p.rect.left;
          const pRight = p.rect.right;

          const playerBottom = player.y + player.height;
          const nextPlayerBottom = nextY + player.height;

          const isHorizontallyOverlapping =
            nextX + player.width > pLeft + 4 && nextX < pRight - 4;

          if (
            isHorizontallyOverlapping &&
            playerBottom <= pTop + 14 &&
            nextPlayerBottom >= pTop &&
            player.vy >= 0
          ) {
            // Choose the highest platform underneath player
            if (pTop < highestLandingY) {
              highestLandingY = pTop;
              landedPlatform = p;
            }
          }
        }
      }

      if (landedPlatform) {
        player.y = landedPlatform.rect.top - player.height;
        player.vy = 0;
        player.isGrounded = true;
        player.jumpsLeft = 2; // Restore Double Jump!
        player.jetpackFuel = 45; // Refuel jetpack!
      }

      // Ceiling and floor boundaries
      const ceilingY = 6;
      const floorY = canvas.height - player.height - 4;

      if (nextY >= floorY) {
        player.y = floorY;
        player.vy = 0;
        player.isGrounded = true;
        player.jumpsLeft = 2; // Restore Double Jump on floor!
        player.jetpackFuel = 45;
      } else if (!player.isGrounded) {
        if (nextY <= ceilingY) {
          player.y = ceilingY;
          if (player.vy < 0) {
            player.vy = 1; // Bump head on ceiling!
            // Small ceiling dust particles
            for (let i = 0; i < 3; i++) {
              particlesRef.current.push({
                x: player.x + player.width / 2 + (Math.random() - 0.5) * 12,
                y: ceilingY,
                vx: (Math.random() - 0.5) * 3,
                vy: Math.random() * 2 + 1,
                color: "#cbd5e1",
                size: 2.5,
                life: 0.25,
                maxLife: 0.25
              });
            }
          }
        } else {
          player.y = nextY;
        }
      }

      // Absolute safety clamp on Y to never get stuck off-screen
      if (player.y < ceilingY) {
        player.y = ceilingY;
        if (player.vy < 0) player.vy = 1;
      }

      // Screen boundaries X
      player.x = Math.max(8, Math.min(canvas.width - player.width - 8, nextX));

      // SMART AUTO-SCROLL CAMERA: Move webpage view if player reaches top/bottom edge
      const isNearTop = player.y < 180;
      const isNearBottom = player.y > canvas.height - 220;
      const moveUp = keys["KeyW"] || keys["ArrowUp"] || keys["Space"];

      if (isNearTop && (player.vy < 0 || moveUp)) {
        window.scrollBy({ top: -8, behavior: "auto" });
      } else if ((isNearBottom && (moveDown || dropThroughTimerRef.current > 0)) || (player.y > canvas.height - 180 && player.vy > 0)) {
        const scrollStep = moveDown ? 13 : 8;
        window.scrollBy({ top: scrollStep, behavior: "auto" });
      }

      // Shooting cooldown and auto-fire
      if (player.shootCooldown > 0) {
        player.shootCooldown--;
      } else if (mouseRef.current.isDown) {
        shoot();
      }

      // 2. UPDATE PROJECTILES & COLLISION WITH DESTRUCTIBLES
      const projectiles = projectilesRef.current;
      for (let i = projectiles.length - 1; i >= 0; i--) {
        const proj = projectiles[i];
        proj.x += proj.vx;
        proj.y += proj.vy;
        proj.life--;

        // Rocket smoke
        if (proj.type === "rocket" && Math.random() > 0.4) {
          particlesRef.current.push({
            x: proj.x,
            y: proj.y,
            vx: -proj.vx * 0.15 + (Math.random() - 0.5),
            vy: -proj.vy * 0.15 + (Math.random() - 0.5),
            color: "#64748b",
            size: Math.random() * 4 + 2,
            life: 0.4,
            maxLife: 0.4
          });
        }

        let hit = false;

        // Collision check against visible platforms
        for (const p of platforms) {
          if (p.isDestroyed) continue;

          if (
            proj.x >= p.rect.left &&
            proj.x <= p.rect.right &&
            proj.y >= p.rect.top &&
            proj.y <= p.rect.bottom
          ) {
            hit = true;
            sound.playHit();

            if (proj.type === "rocket") {
              createExplosion(proj.x, proj.y, 35, "#f97316");
              sound.playExplosion();
            } else {
              createExplosion(proj.x, proj.y, 8, "#38bdf8");
            }

            if (p.isDestructible && p.id) {
              const damage = proj.type === "rocket" ? 75 : proj.type === "hammer" ? 100 : 25;
              onElementDamageRef.current(p.id, damage);
              setScore((s) => s + 50);

              // Check if element will be destroyed or is killed
              const node = document.querySelector(`[data-destructible-id="${p.id}"]`);
              const currentHp = node ? Number(node.getAttribute("data-hp") || 100) : 100;

              if (currentHp - damage <= 0) {
                sound.playExplosion();
                createExplosion(p.rect.left + p.rect.width / 2, p.rect.top + p.rect.height / 2, 45, "#ef4444");
                addFloatingText(
                  p.rect.left + p.rect.width / 2,
                  p.rect.top,
                  langRef.current === "es" ? "¡DESTRUIDO! +500 PTS" : "DESTROYED! +500 PTS",
                  "#f59e0b"
                );
                setScore((s) => s + 500);

                // Spawn Loot Item!
                lootRef.current.push({
                  id: Math.random().toString(),
                  x: p.rect.left + p.rect.width / 2,
                  y: p.rect.top + p.rect.height / 2,
                  vy: -6,
                  label: "📦 LOOT",
                  collected: false,
                  value: 300
                });
              }
            } else {
              setScore((s) => s + 25);
            }
            break;
          }
        }

        // Projectile offscreen or dead
        if (
          hit ||
          proj.life <= 0 ||
          proj.x < 0 ||
          proj.x > canvas.width ||
          proj.y < 0 ||
          proj.y > canvas.height
        ) {
          projectiles.splice(i, 1);
        }
      }

      // 3. UPDATE LOOT ITEMS
      const loots = lootRef.current;
      for (let i = loots.length - 1; i >= 0; i--) {
        const item = loots[i];
        item.y += item.vy;
        item.vy += 0.35; // gravity

        // Floor bounce
        if (item.y > canvas.height - 30) {
          item.y = canvas.height - 30;
          item.vy = -item.vy * 0.4;
        }

        // Player pickup
        const distToPlayer = Math.hypot(
          item.x - (player.x + player.width / 2),
          item.y - (player.y + player.height / 2)
        );

        if (distToPlayer < 40) {
          sound.playLoot();
          addFloatingText(item.x, item.y - 10, "+300 PTS!", "#10b981");
          setScore((s) => s + item.value);
          createExplosion(item.x, item.y, 10, "#10b981");
          loots.splice(i, 1);
        }
      }

      // 4. UPDATE PARTICLES
      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const part = particles[i];
        part.x += part.vx;
        part.y += part.vy;
        part.vy += 0.25; // gravity
        part.life -= 0.02;

        if (part.life <= 0) {
          particles.splice(i, 1);
        }
      }

      // 5. UPDATE FLOATING TEXTS
      const floatingTexts = floatingTextsRef.current;
      for (let i = floatingTexts.length - 1; i >= 0; i--) {
        const ft = floatingTexts[i];
        ft.y -= 1.2;
        ft.life -= 0.02;

        if (ft.life <= 0) {
          floatingTexts.splice(i, 1);
        }
      }

      // ==================== RENDERING ====================

      // A. RENDER FLOOR JUMP-PAD INDICATOR (Trampolín de suelo)
      ctx.save();
      ctx.fillStyle = "rgba(16, 185, 129, 0.15)";
      ctx.fillRect(0, canvas.height - 6, canvas.width, 6);
      ctx.restore();

      // B. RENDER PARTICLES
      for (const part of particles) {
        ctx.globalAlpha = Math.max(0, part.life / part.maxLife);
        if (part.text) {
          ctx.font = "bold 13px monospace";
          ctx.fillStyle = part.color;
          ctx.fillText(part.text, part.x, part.y);
        } else {
          ctx.fillStyle = part.color;
          ctx.fillRect(part.x, part.y, part.size, part.size);
        }
      }
      ctx.globalAlpha = 1.0;

      // C. RENDER PROJECTILES
      for (const proj of projectiles) {
        if (proj.type === "laser") {
          ctx.save();
          ctx.translate(proj.x, proj.y);
          ctx.rotate(proj.angle);
          ctx.fillStyle = "#38bdf8";
          ctx.shadowColor = "#0284c7";
          ctx.shadowBlur = 10;
          ctx.fillRect(-10, -3, 20, 6);
          ctx.restore();
        } else if (proj.type === "rocket") {
          ctx.save();
          ctx.translate(proj.x, proj.y);
          ctx.rotate(proj.angle);
          ctx.fillStyle = "#f97316";
          ctx.fillRect(-8, -4, 16, 8);
          ctx.fillStyle = "#ef4444";
          ctx.fillRect(4, -4, 4, 8);
          ctx.restore();
        } else if (proj.type === "hammer") {
          ctx.save();
          ctx.translate(proj.x, proj.y);
          ctx.strokeStyle = "rgba(236, 72, 153, 0.7)";
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.arc(0, 0, proj.radius, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }
      }

      // D. RENDER LOOT ITEMS
      for (const item of loots) {
        ctx.save();
        ctx.translate(item.x, item.y);
        ctx.shadowColor = "#38bdf8";
        ctx.shadowBlur = 12;
        ctx.fillStyle = "#f59e0b";
        ctx.fillRect(-10, -10, 20, 20);
        ctx.fillStyle = "#1e293b";
        ctx.fillRect(-6, -6, 12, 12);
        ctx.fillStyle = "#38bdf8";
        ctx.fillRect(-3, -3, 6, 6);
        ctx.restore();
      }

      // E. RENDER FLOATING TEXTS
      for (const ft of floatingTexts) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, ft.life);
        ctx.font = "bold 15px monospace";
        ctx.fillStyle = ft.color;
        ctx.shadowColor = "#000000";
        ctx.shadowBlur = 4;
        ctx.fillText(ft.text, ft.x - 30, ft.y);
        ctx.restore();
      }

      // F. RENDER RETRO PIXEL CHARACTER (Martín)
      const px = player.x;
      const py = player.y;
      const facing = player.facing;
      const legOffset = Math.sin(player.animFrame) * 4;

      ctx.save();
      // Shadow
      ctx.fillStyle = "rgba(0,0,0,0.3)";
      ctx.beginPath();
      ctx.ellipse(px + player.width / 2, py + player.height, 14, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Body / Jacket
      ctx.fillStyle = "#059669";
      ctx.fillRect(px + 4, py + 16, 20, 15);

      // Shirt detail
      ctx.fillStyle = "#10b981";
      ctx.fillRect(px + 10, py + 18, 8, 13);

      // Head & Skin
      ctx.fillStyle = "#fed7aa";
      ctx.fillRect(px + 6, py + 4, 16, 13);

      // Hair
      ctx.fillStyle = "#1e1e1e";
      ctx.fillRect(px + 5, py + 2, 18, 5);
      ctx.fillRect(px + (facing === 1 ? 4 : 18), py + 6, 4, 6);

      // Eyes
      ctx.fillStyle = "#0f172a";
      const eyeX = facing === 1 ? px + 16 : px + 9;
      ctx.fillRect(eyeX, py + 8, 3, 3);

      // Legs / Pants
      ctx.fillStyle = "#1e293b";
      ctx.fillRect(px + 6, py + 31, 6, 8 + (player.isGrounded ? legOffset : 0));
      ctx.fillRect(px + 16, py + 31, 6, 8 - (player.isGrounded ? legOffset : 0));

      // Shoes
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(px + 5, py + 38 + (player.isGrounded ? legOffset : 0), 8, 4);
      ctx.fillRect(px + 15, py + 38 - (player.isGrounded ? legOffset : 0), 8, 4);

      // Double Jump Glow indicator on boots if double jump is ready
      if (!player.isGrounded && player.jumpsLeft > 0) {
        ctx.fillStyle = "#38bdf8";
        ctx.fillRect(px + 4, py + 40, 4, 2);
        ctx.fillRect(px + 18, py + 40, 4, 2);
      }

      // Weapon Arm pointing at cursor
      const armOriginX = px + (facing === 1 ? 18 : 10);
      const armOriginY = py + 20;
      const aimAngle = Math.atan2(mouseRef.current.y - armOriginY, mouseRef.current.x - armOriginX);

      ctx.save();
      ctx.translate(armOriginX, armOriginY);
      ctx.rotate(aimAngle);

      // Weapon barrel
      const activeW = selectedWeaponRef.current;
      if (activeW === "laser") {
        ctx.fillStyle = "#38bdf8";
        ctx.fillRect(0, -3, 14, 6);
        ctx.fillStyle = "#0284c7";
        ctx.fillRect(10, -4, 4, 8);
      } else if (activeW === "rocket") {
        ctx.fillStyle = "#f97316";
        ctx.fillRect(0, -5, 18, 10);
      } else {
        ctx.fillStyle = "#ec4899";
        ctx.fillRect(0, -6, 12, 12);
      }
      ctx.restore();

      ctx.restore(); // Restore player

      // G. RETRO CROSSHAIR AT MOUSE
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      ctx.save();
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(mx, my, 8, 0, Math.PI * 2);
      ctx.moveTo(mx - 12, my);
      ctx.lineTo(mx + 12, my);
      ctx.moveTo(mx, my - 12);
      ctx.lineTo(mx, my + 12);
      ctx.stroke();
      ctx.restore();

      ctx.restore(); // Restore shake
      animationFrameId = requestAnimationFrame(gameLoop);
    };

    animationFrameId = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isActive, createExplosion, addFloatingText, shoot]);

  if (!isActive) return null;

  return (
    <>
      {/* Fullscreen Canvas Overlay for Game Physics and Retro Character */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-40 pointer-events-none w-full h-full cursor-crosshair"
      />

      {/* Floating Retro HUD Top Bar */}
      <div className="fixed top-4 inset-x-4 z-50 flex items-center justify-between pointer-events-none max-w-6xl mx-auto">
        {/* Score & Destroyed Count */}
        <div className="flex items-center gap-3 bg-zinc-950/90 border border-emerald-500/40 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-2xl pointer-events-auto">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs uppercase tracking-widest font-mono text-emerald-400 font-bold">
              {UI_TRANSLATIONS.game.chaosTitle[lang]}
            </span>
          </div>

          <div className="h-4 w-px bg-zinc-800" />

          <div className="font-mono text-sm">
            <span className="text-zinc-400">Score: </span>
            <span className="text-white font-bold text-base">{score}</span>
          </div>

          <div className="h-4 w-px bg-zinc-800 hidden sm:block" />

          <div className="font-mono text-xs text-zinc-400 hidden sm:block">
            <span>{UI_TRANSLATIONS.game.destroyedCount[lang]}: </span>
            <span className="text-rose-400 font-bold">{destroyedElements.size}</span>
          </div>
        </div>

        {/* Weapons Selector & Super Boost */}
        <div className="hidden md:flex items-center gap-1.5 bg-zinc-950/90 border border-zinc-800 backdrop-blur-md p-1.5 rounded-2xl shadow-2xl pointer-events-auto">
          <button
            type="button"
            onClick={() => setSelectedWeapon("laser")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
              selectedWeapon === "laser"
                ? "bg-sky-500/20 text-sky-300 border border-sky-500/50"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Crosshair className="w-3.5 h-3.5" />
            <span>[1] Láser</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedWeapon("rocket")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
              selectedWeapon === "rocket"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/50"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>[2] Bazooka</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedWeapon("hammer")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
              selectedWeapon === "hammer"
                ? "bg-pink-500/20 text-pink-300 border border-pink-500/50"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>[3] Martillo</span>
          </button>

          {/* Quick Super Boost Launcher button */}
          <div className="h-4 w-px bg-zinc-800 mx-1" />

          <button
            type="button"
            onClick={triggerSuperBoost}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-all active:scale-95"
            title="Super Impulso hacia arriba (Tecla R o Shift)"
          >
            <Rocket className="w-3.5 h-3.5 animate-bounce" />
            <span>[R] Super Impulso</span>
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Audio toggle */}
          <button
            type="button"
            onClick={toggleMute}
            className="p-2.5 bg-zinc-950/90 border border-zinc-800 text-zinc-300 hover:text-white rounded-2xl backdrop-blur-md shadow-xl transition-colors"
            title={isMuted ? "Activar Sonido (M)" : "Silenciar (M)"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Git checkout --hard (Repair) Button */}
          <button
            type="button"
            onClick={handleRepairAll}
            className="flex items-center gap-2 px-3.5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold rounded-2xl shadow-xl transition-all active:scale-95 border border-emerald-400"
            title="Restaurar todos los componentes destruidos"
          >
            <RotateCcw className="w-4 h-4 animate-spin-slow" />
            <span className="hidden sm:inline">git checkout --hard</span>
            <span className="sm:hidden">Reparar</span>
          </button>

          {/* Close / Exit Game */}
          <button
            type="button"
            onClick={onClose}
            className="p-2.5 bg-zinc-950/90 border border-zinc-800 text-zinc-400 hover:text-rose-400 hover:border-rose-500/40 rounded-2xl backdrop-blur-md shadow-xl transition-colors"
            title="Salir del Modo Caos (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Floating Helper Toast / Notification */}
      {message && (
        <div className="fixed bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
          <div className="bg-zinc-950/95 border border-emerald-500/50 text-emerald-300 text-xs md:text-sm font-mono px-4 py-2.5 rounded-2xl shadow-2xl backdrop-blur flex items-center gap-2.5 animate-bounce">
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{message}</span>
          </div>
        </div>
      )}

      {/* Mobile Virtual Controls with Double Jump & Propellant Support */}
      <TouchControls
        onMoveLeft={(active) => {
          keysRef.current["ArrowLeft"] = active;
        }}
        onMoveRight={(active) => {
          keysRef.current["ArrowRight"] = active;
        }}
        onMoveDown={(active) => {
          keysRef.current["ArrowDown"] = active;
        }}
        onDropDown={() => {
          triggerDropDown();
        }}
        onJump={() => {
          triggerJump();
          playerRef.current.jumpKeyHeld = true;
          setTimeout(() => {
            playerRef.current.jumpKeyHeld = false;
          }, 350);
        }}
        onFire={() => {
          shoot();
        }}
      />
    </>
  );
}
