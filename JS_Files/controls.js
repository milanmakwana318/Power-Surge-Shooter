import { player } from './player.js';
import { Bullet, bullets, bulletHandling } from './bullet.js';
import { enemys, powerUps } from './main.js';
import { powerUpHandlers } from "./powers.js";
import { gameState } from './gameState.js';

export let isMoving = false;
let keysPressed = {};
let canFire = true;

export function fireBullet() {
  const bullet1 = new Bullet(
    player.x + player.width / 2 - 5,
    player.y + player.height / 2 - 5
  );

  bullets.push(bullet1);
  if (gameState.isDoubleShot) {
    const bullet2 = new Bullet(
      player.x + player.width / 2 - 5,
      player.y + player.height / 2 + 20 // lower shot
    );
    bullets.push(bullet2);
  }

  if (gameState.isTriangleShot) {
    // Top bullet
    const bulletTop = new Bullet(
      player.x + player.width / 2,
      player.y + player.height / 2 - 20
    );
    bullets.push(bulletTop);

    // Bottom bullet
    const bulletBottom = new Bullet(
      player.x + player.width / 2,
      player.y + player.height / 2 + 20
    );
    bullets.push(bulletBottom);

    // Middle bullet
    const bulletMiddle = new Bullet(
      player.x + player.width / 2,
      player.y + player.height / 2
    );
    bullets.push(bulletMiddle);

    // Optional: disable double shot while triangle is active
    if (gameState.isDoubleShot) {
      gameState.isDoubleShot = false;
    }
  }


  bulletHandling(enemys, powerUps);
  console.log("🔫 Bullet fired");

  canFire = false;
  setTimeout(() => {
    canFire = true;
  }, 200); // cooldown in ms
}

function handleInputs() {
  // Handle movement
  if (keysPressed["ArrowUp"] || keysPressed["w"]) {
    player.y -= player.speed;
    isMoving = true;
  } else if (keysPressed["ArrowDown"] || keysPressed["s"]) {
    player.y += player.speed;
    isMoving = true;
  } else {
    isMoving = false;
  }

  // Handle firing
  if ((keysPressed["f"] || keysPressed["F"]) && canFire) {
    fireBullet();
  }

  requestAnimationFrame(handleInputs);
}

export function setupControls(upButton, downButton, fireButton) {
  // Mobile touch buttons
  upButton.addEventListener("click", () => {
    player.y -= 10;
  });

  downButton.addEventListener("click", () => {
    player.y += 10;
  });

  fireButton.addEventListener("click", () => {
    fireBullet();
  })

  // Keyboard events
  document.addEventListener("keydown", (e) => {
    keysPressed[e.key] = true;
  });

  document.addEventListener("keyup", (e) => {
    delete keysPressed[e.key];
  });

  // Start input loop
  handleInputs();
}
