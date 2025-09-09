// ========================
// ✅ IMPORTS
// ========================
import { setupControls, isMoving } from './controls.js';
import { player } from './player.js';
import { PowerUp, powerUpTypes, applyPowerUp } from './powers.js';
import { Bullet, bullets, bulletHandling } from './bullet.js';
import { gameState } from './gameState.js';
import { enemyHandling} from "./enemys.js";

// ========================
// 🎮 CANVAS SETUP
// ========================
export const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// ========================
// 🎮 ELEMENTS
// ========================
const upButton = document.getElementById("up");
const downButton = document.getElementById("down");
const fireButton = document.getElementById("fire")
setupControls(upButton, downButton, fireButton); // Setup controls

export let enemys = [];
export let powerUps = [];

let enemyCount = 0;
let frames = 0;
let bulletFrames = 0;
let frameRate = 4;
let playerDeath = false;


const deathsound = new Audio("sound.mp3");
deathsound.load();

// ========================
// 👾 ENEMY CLASS
// ========================
class Enemy {
  constructor() {
    this.width = 40;
    this.height = 40;
    this.x = canvas.width;
    this.y = Math.random() * (canvas.height - this.height);
    this.damage = 10;
    this.health = 10;
    this.enemySpeed = 5;
  }

  update() {
    this.x -= this.enemySpeed;
  }

  draw(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

// ========================
// 🧠 UTILITIES
// ========================
export function isColliding(rect1, rect2) {
  // if (!rect1 || !rect2) return false;
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}

function getActivePower(gameState) {
  if (gameState.isShieldActive) return "Shield";
  if (gameState.isMagnetActive) return "Magnet";
  if (gameState.isDoubleShot) return "Double Shot";
  if (gameState.isPierceActive) return "Pierce";
  if (gameState.isTriangleShot) return "Triangle Shot";
  if (gameState.isBounceEnabled) return "Bounce";
  if (gameState.isScoreDoubled) return "Multiplier";
  if (gameState.isArmorActive) return "Armor";
  if (gameState.enemySpeed === 1) return "Time Slow";
  if (gameState.playerSpeed === 40) return "Speed";
  return "None";
}


function drawUI(ctx, health, score, gameState) {
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText(`Health: ${health}`, 10, 30);
  ctx.fillText(`Score: ${score}`, 150, 30);

  const activePower = getActivePower(gameState);
  ctx.fillText(`Power : ${activePower}`, 300, 30)
}

// ========================
// ⏱️ FRAME CONTROL
// ========================
function checkFrameRate() {
  gameState.bulletFramerate = isMoving ? 3 : 5;

  if (frames % frameRate === 0) {
    if (enemyCount % 10 === 0) {
      enemys.push(new Enemy());
    }
    enemyCount++;
  }

  // if (bulletFrames % gameState.bulletFramerate === 0) {
  //   bullets.push(new Bullet(player.x + player.width / 2 - 5, player.y + player.height / 2 - 5));
  // }

  bulletFrames++;
}

// ========================
// ⚡ POWER-UP HANDLING
// ========================
function powerUpHandling() {
  for (let i = powerUps.length - 1; i >= 0; i--) {
    const power = powerUps[i];
    power.update();
    power.draw(ctx);

    // Player collects the power-up
    if (isColliding(player, power)) {
      applyPowerUp(power.type.name, gameState);
      powerUps.splice(i, 1);
      continue; // skip magnet movement for removed power-up
    }

    // Magnet effect: pull power-up toward player
    if (gameState.isMagnetActive) {
      power.x -= (power.x - player.x) * 0.02;
      power.y -= (power.y - player.y) * 0.02;
    }
  }

  // Apply speed from gameState to player
  if (gameState.playerSpeed === 20) {
    player.speed = gameState.playerSpeed;
    console.log("speed Boosted...");
  } else {
    player.speed = 10;
  }
}

// ========================
// ☠️ END GAME
// ========================
function endGame() {
  deathsound.play();
  setTimeout(() => {
    if (confirm("Game Over! Play again?")) {
      location.reload();
    }
  }, 500);
}

// ========================
// 🌀 ANIMATION LOOP
// ========================
function animate() {
  if (playerDeath) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  player.draw(ctx);
  drawUI(ctx, gameState.playerHealth, gameState.score, gameState);

  checkFrameRate();
  bulletHandling(enemys, powerUps); // Central bullet logic
  enemyHandling();
  powerUpHandling();

  frames++;
  if (playerDeath) {
    requestAnimationFrame(animate) = false;
    endGame();

  } else {
    requestAnimationFrame(animate)
  }
}

// ========================
// ▶️ START GAME
// ========================
animate();
