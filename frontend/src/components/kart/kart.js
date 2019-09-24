import kartSprite from "../../assets/images/mario_sprite.png";

export const _drawKart = (ctx) => {
  let img = new Image();
  img.src = kartSprite;
  ctx.drawImage(img, 100, 100);
}