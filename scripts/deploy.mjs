import { execSync } from "child_process";
import fs from "fs";
import path from "path";

console.log("🚀 Building Next.js static export for GitHub Pages (/cv)...");
execSync("npx next build", {
  stdio: "inherit",
  env: {
    ...process.env,
    DEPLOY_TARGET: "gh-pages",
  },
});

const outDir = path.resolve(process.cwd(), "out");
const nojekyllFile = path.join(outDir, ".nojekyll");

if (!fs.existsSync(nojekyllFile)) {
  fs.writeFileSync(nojekyllFile, "");
  console.log("✅ Created .nojekyll in out directory");
}

console.log("📦 Publishing to GitHub branch gh-pages...");
execSync("npx gh-pages -d out --dotfiles", {
  stdio: "inherit",
});

console.log("🎉 Successfully deployed to gh-pages branch!");
