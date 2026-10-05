"use client";

import React from "react";
import { ArrowLeft, ArrowRight, ArrowDown, ArrowUp, Crosshair } from "lucide-react";

interface TouchControlsProps {
  onMoveLeft: (active: boolean) => void;
  onMoveRight: (active: boolean) => void;
  onMoveDown: (active: boolean) => void;
  onDropDown: () => void;
  onJump: () => void;
  onFire: () => void;
}

export function TouchControls({
  onMoveLeft,
  onMoveRight,
  onMoveDown,
  onDropDown,
  onJump,
  onFire
}: TouchControlsProps) {
  return (
    <div className="fixed inset-x-0 bottom-4 z-50 flex items-center justify-between px-4 sm:px-6 pointer-events-none md:hidden">
      {/* D-Pad */}
      <div className="flex gap-1.5 sm:gap-2 pointer-events-auto">
        <button
          type="button"
          onTouchStart={() => onMoveLeft(true)}
          onTouchEnd={() => onMoveLeft(false)}
          onMouseDown={() => onMoveLeft(true)}
          onMouseUp={() => onMoveLeft(false)}
          className="w-12 h-12 sm:w-14 sm:h-14 bg-zinc-900/80 active:bg-emerald-600/90 text-white rounded-2xl flex items-center justify-center border border-zinc-700 active:scale-95 shadow-lg backdrop-blur select-none touch-none"
          aria-label="Mover Izquierda"
        >
          <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          type="button"
          onTouchStart={() => {
            onDropDown();
            onMoveDown(true);
          }}
          onTouchEnd={() => onMoveDown(false)}
          onMouseDown={() => {
            onDropDown();
            onMoveDown(true);
          }}
          onMouseUp={() => onMoveDown(false)}
          className="w-12 h-12 sm:w-14 sm:h-14 bg-zinc-900/80 active:bg-amber-600/90 text-white rounded-2xl flex items-center justify-center border border-zinc-700 active:scale-95 shadow-lg backdrop-blur select-none touch-none"
          aria-label="Bajar plataforma / Caída rápida"
          title="Bajar de plataforma"
        >
          <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          type="button"
          onTouchStart={() => onMoveRight(true)}
          onTouchEnd={() => onMoveRight(false)}
          onMouseDown={() => onMoveRight(true)}
          onMouseUp={() => onMoveRight(false)}
          className="w-12 h-12 sm:w-14 sm:h-14 bg-zinc-900/80 active:bg-emerald-600/90 text-white rounded-2xl flex items-center justify-center border border-zinc-700 active:scale-95 shadow-lg backdrop-blur select-none touch-none"
          aria-label="Mover Derecha"
        >
          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 sm:gap-3 pointer-events-auto">
        <button
          type="button"
          onTouchStart={onJump}
          onMouseDown={onJump}
          className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-600/90 active:bg-blue-500 text-white rounded-2xl flex items-center justify-center border border-blue-400 active:scale-95 shadow-lg backdrop-blur select-none touch-none font-bold"
          aria-label="Saltar"
        >
          <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          type="button"
          onTouchStart={onFire}
          onMouseDown={onFire}
          className="w-13 h-12 sm:w-16 sm:h-14 bg-rose-600/90 active:bg-rose-500 text-white rounded-2xl flex items-center justify-center border border-rose-400 active:scale-95 shadow-lg backdrop-blur select-none touch-none font-bold"
          aria-label="Disparar"
        >
          <Crosshair className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
    </div>
  );
}
