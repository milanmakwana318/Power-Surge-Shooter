// bullet.js
import { ctx, canvas } from './main.js';
import { gameState } from './gameState.js';
import { player } from './player.js';
import { powerUpTypes, PowerUp } from './powers.js';

export let bullets = [];

export class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 20;
    this.height = 10;
    this.speed = 10;
    this.bulletdamage = 10;
    this.hitEnemy = new Set();
  }

  update() {
    this.x += this.speed;
  }

  draw(ctx) {
    ctx.fillStyle = "white";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

export function bulletHandling(enemys, powerUps) {
  for (let i = bullets.length - 1; i >= 0; i--) {
    let bullet = bullets[i];
    bullet.update();
    bullet.draw(ctx);

    if (bullets[i].x > canvas.width) {
      bullets.splice(i, 1);
      continue;
    }

    for (let j = enemys.length - 1; j >= 0; j--) {
      let enemy = enemys[i];
      if (
        bullets[i].x < enemys[j].x + enemys[j].width &&
        bullets[i].x + bullets[i].width > enemys[j].x &&
        bullets[i].y < enemys[j].y + enemys[j].height &&
        bullets[i].y + bullets[i].height > enemys[j].y
      ) {
        enemys[j].health -= bullets[i].bulletdamage;
        bullets.splice(i, 1);
       
        // if (!gameState.isPiercing && bullets.hitEnemy.has(enemy)) continue 
      

        if (enemys[j].health <= 0) {
          const dropChance = Math.random();
          if (dropChance < 0.5) {
            const type = powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)];
            powerUps.push(new PowerUp(enemys[j].x, enemys[j].y, type));
          }
          enemys.splice(j, 1);
          // gameState.score += gameState.isScoreDoubled ? 2 : 1;
          let tempScore_varable = gameState.score
          if (gameState.isScoreDoubled) {
            gameState.score += 2; 
          }else{
            gameState.score += 1;
          }
        }
        break;
      }
    }
  }
}
