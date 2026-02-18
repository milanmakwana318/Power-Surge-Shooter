
// ========================
// 🧠 GLOBAL GAME STATE
// ========================

export const gameState = {
  // 🩸 Player Stats
  playerHealth: 200,
  playerSpeed: 40,

  // 💥 Power-Up Effects
  isShieldActive: false,
  isDoubleShot: false,
  isPiercing: false,
  isMagnetActive: false,
  isMultiplierActive: false,
  isTimeSlowActive: false,
  isTriangleShot: false,

  // 🔫 Bullet Settings
  bulletFramerate: 5,

  // 📊 Game Score
  score: 0,

  // extra powers

  isRapidFire: false,
  isAutoAim: false,
  isExplosiveShot: false,
  isHoming: false,
  isFireTrail: false,
  isFreezeField: false
};


const enemyState = {
  isNormalEnemy: false,
  isFastEnemy: false,
  isTankEnemy: false,
  isShooterEnemy: false,
  isSmartEnemy: false
};
