import { enemys, ctx, isColliding } from "./main.js";
import { player } from "./player.js";
import { gameState } from "./gameState.js";
// ========================
// 👾 ENEMY HANDLING
// ========================
export function enemyHandling() {
    enemyHandleWithpowers();
}

function enemyHandleWithpowers() {

    for (let i = enemys.length - 1; i >= 0; i--) {
        const enemy = enemys[i];
        enemy.update();
        enemy.draw(ctx);

        if (isColliding(player, enemy)) {
            let oldDamage = enemy.damage;
            // Armor aapower 
            if (gameState.isArmorActive) {
                enemy.damage = enemy.damage *= 0.5;
                player.color = "red"
            }
            else {
                enemy.damage = oldDamage;
                player.color = "blue"
            }

            if (!gameState.isShieldActive) {
                gameState.playerHealth -= enemy.damage;
            }
            if (gameState.isShieldActive) {
                player.color = "cyan";
            } else {
                player.color = "blue";
            }

            enemys.splice(i, 1); // Remove enemy after collision
            if (gameState.playerHealth <= 0) {
                playerDeath = true;
                endGame();
                return;
            }
        }

        // Time slow


        if (gameState.enemySpeed === 1) {
            enemy.speed = enemy.speed - 0.5; 7
            console.log("Enemy speed is slow");
        }

    }
}