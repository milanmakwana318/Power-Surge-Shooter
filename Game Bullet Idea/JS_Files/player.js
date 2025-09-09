// ========================
// 🎮 PLAYER SETUP
// ========================

export const player = {
  x: 0,
  y: 300,
  width: 40,
  height: 150,
  speed : 10,
  color: "blue", // Easier to modify dynamically

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  },
};
