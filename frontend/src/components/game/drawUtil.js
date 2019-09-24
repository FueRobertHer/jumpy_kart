import marioSprite from '../../assets/images/mario_sprite.png';
import peachSprite from '../../assets/images/peach_sprite.png';
import toadSprite from '../../assets/images/toad_sprite.png';
import yoshiSprite from '../../assets/images/yoshi_sprite.png';
import pipeSprite from '../../assets/images/pipes_sprite.png';

export const _drawKart = (ctx, player) => {

  // if (player.color === "RED") {
  //   if (player.invuln > 0) {
  //     img.src = redGod;
  //   } else {
  //     img.src = redShip;
  //   }
  // } else if (player.color === "BLUE") {
  //   if (player.invuln > 0) {
  //     img.src = blueGod;
  //   } else {
  //     img.src = blueShip;
  //   }
  // } else if (player.color === "GREEN") {
  //   if (player.invuln > 0) {
  //     img.src = greenGod;
  //   } else {
  //     img.src = greenShip;
  //   }
  // } else if (player.color === "YELLOW") {
  //   if (player.invuln > 0) {
  //     img.src = yellowGod;
  //   } else {
  //     img.src = yellowShip;
  //   }
  // }

  let mario = new Image();
  mario.src = marioSprite;
  mario.onload = () => {
    ctx.drawImage(mario, 100, 100);
  }

  let peach = new Image();
  peach.src = peachSprite;
  peach.onload = () => {
    ctx.drawImage(peach, 200, 100);
  }

  let toad = new Image();
  toad.src = toadSprite;
  toad.onload = () => {
    ctx.drawImage(toad, 100, 200);
  }

  let yoshi = new Image();
  yoshi.src = yoshiSprite;
  yoshi.onload = () => {
    ctx.drawImage(yoshi, 200, 200);
  }






  // ctx.save();
  // ctx.translate(player.pos.x, player.pos.y);
  // ctx.rotate(rotateDir);
  // ctx.translate(-player.pos.x, -player.pos.y);
  // ctx.drawImage(
  //   img,
  //   player.pos.x - player.radius - 1,
  //   player.pos.y - player.radius - 3,
  //   player.radius * 2 + 5,
  //   player.radius * 2 + 5
  // );
  // ctx.restore();
}

export const _drawPipes = (ctx) => {
  let pipe = new Image();
  pipe.src = pipeSprite;
  pipe.onload = () => {
    ctx.drawImage(pipe, 300, 150);
  }
}
