// powers.js
import { enemys } from './main.js';
import { gameState} from "./gameState.js";
// gameState.enemys = enemys;

// ========================
// 🔋 POWER-UP HANDLERS
// ========================
export const powerUpHandlers = {
  Shield: {
    icon: "🛡️",
    color: "cyan",
    // sound: "shield.mp3",
    duration: 5000,
    apply: (state) => {
      state.isShieldActive = true;
      setTimeout(() => (state.isShieldActive = false), 5000);
    }
  },
Bomb: {
  icon: "💣",
  color: "yellow",
  // sound: "bomb.mp3",
  duration: null,
  apply: () => {
    gameState.score += enemys.length; 
    enemys.length = 0; // directly clear imported enemys arra
    console.log("💣 Bomb activated: all enemies removed");
  }
},
  Magnet: {
    icon: "🧲",
    color: "magenta",
    // sound: "magnet.mp3",
    duration: 5000,
    apply: (state) => {
      state.isMagnetActive = true;
      setTimeout(() => (state.isMagnetActive = false), 5000);
    }
  },
  Speed: {
    icon: "🏃",
    color: "white",
    // sound: "speed.mp3",
    duration: 5000,
    apply: (state) => {
      state.playerSpeed = 20;
      setTimeout(() => (state.playerSpeed = 10), 5000);
    }
  },
  DoubleShot: {
    icon: "🔫",
    color: "lime",
    // sound: "doubleshot.mp3",
    duration: 5000,
    apply: (state) => {
      state.isDoubleShot = true;
      setTimeout(() => (state.isDoubleShot = false), 5000);
    }
  },
  Armor: {
    icon: "🪖",
    color: "gray",
    // sound: "armor.mp3",
    duration: 5000,
    apply: (state) => {
      state.isArmorActive = true;
      setTimeout(() => (state.isArmorActive = false), 5000);
    }
  },
  Pierce: {
    icon: "💥",
    color: "blue",
    // sound: "pierce.mp3",
    duration: 5000,
    apply: (state) => {
      state.isPierceActive = true;
      setTimeout(() => (state.isPierceActive = false), 5000);
    }
  },
  TimeSlow: {
    icon: "🐢",
    color: "purple",
    // sound: "timeslow.mp3",
    duration: 5000,
    apply: (state) => {
      state.enemySpeed = 1;
      setTimeout(() => (state.enemySpeed = 5), 5000);
    }
  },
  Bounce: {
    icon: "🔁",
    color: "lightblue",
    // sound: "bounce.mp3",
    duration: 5000,
    apply: (state) => {
      state.isBounceEnabled = true;
      setTimeout(() => (state.isBounceEnabled = false), 5000);
    }
  },
  Multiplier: {
    icon: "✖️",
    color: "gold",
    // sound: "multiplier.mp3",
    duration: 5000,
    apply: (state) => {
      state.isScoreDoubled = true;
      setTimeout(() => (state.isScoreDoubled = false), 5000);
    }
  },
  TriangleShot: {
    icon: "🔼",
    color: "orange",
    // sound: "triangle.mp3",
    duration: 5000,
    apply: (state) => {
      state.isTriangleShot = true;
      setTimeout(() => (state.isTriangleShot = false), 5000);
    }
  }

};

// ========================
// 🧱 POWER-UP TYPES (for display + selection)
// ========================
export const powerUpTypes = Object.keys(powerUpHandlers).map(name => ({
  name,
  color: powerUpHandlers[name].color,
}));

// ========================
// 🎁 POWER-UP CLASS
// ========================
export class PowerUp {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.width = 30;
    this.height = 20;
    this.speed = 3;
  }

  update() {
    this.x -= this.speed;
  }

  draw(ctx) {
    ctx.fillStyle = this.type.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

// ========================
// ⚡ UNIVERSAL POWER-UP FUNCTION
// ========================
export function applyPowerUp(typeName, gameState) {
  const handler = powerUpHandlers[typeName];
  if (!handler) return;

  // Optional sound
  // if (handler.sound) {
  //   const sound = new Audio(`sounds/${handler.sound}`);
  //   sound.play();
  // }

  handler.apply(gameState);
}
