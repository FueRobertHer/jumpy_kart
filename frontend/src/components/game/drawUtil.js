import mario from "../../assets/images/mario_sprite.png";
import peach from "../../assets/images/peach_sprite.png";
import toad from "../../assets/images/toad_sprite.png";
import yoshi from "../../assets/images/yoshi_sprite.png";
import pipeSprite from "../../assets/images/pipes_sprite.png";
import bananaSprite from "../../assets/images/banana.png";
import coinSprite from "../../assets/images/coin.png";
import mushroomSprite from "../../assets/images/mushroom.png";
import backgroundSprite from "../../assets/images/background.png";
import roadSprite from "../../assets/images/road.png";

let char1 = new Image();
char1.src = mario;
let char2 = new Image();
char2.src = peach;
let char3 = new Image();
char3.src = toad;
let char4 = new Image();
char4.src = yoshi;

export const _drawKart = (ctx, player) => {
  if (player.sprite === "mario") {
    ctx.save();
    ctx.drawImage(char1, player.pos[0], player.pos[1]);
    ctx.restore();
  } else if (player.sprite === "peach") {
    ctx.save();
    ctx.drawImage(char2, player.pos[0], player.pos[1]);
    ctx.restore();
  } else if (player.sprite === "toad") {
    ctx.save();
    ctx.drawImage(char3, player.pos[0], player.pos[1]);
    ctx.restore();
  } else {
    ctx.save();
    ctx.drawImage(char4, player.pos[0], player.pos[1]);
    ctx.restore();
  }
};

let background = new Image();
background.src = backgroundSprite;
export const _drawBackground = ctx => {
  ctx.save();
  ctx.drawImage(background, 0, 0);
  ctx.restore();
};

let road = new Image();
road.src = roadSprite;
export const _drawRoad = ctx => {
  ctx.save();
  ctx.drawImage(road, 0, 476);
  ctx.restore();
};

let randomPipe = new Image();
randomPipe.src = pipeSprite;
export const _drawPipes = (ctx, pipes) => {
  pipes.forEach(pipe => {
    ctx.save();
    ctx.drawImage(randomPipe, pipe.pos[0], pipe.height);
    ctx.restore();
  });
};

let bananaImg = new Image();
bananaImg.src = bananaSprite;
let coinImg = new Image();
coinImg.src = coinSprite;
let mushroomImg = new Image();
mushroomImg.src = mushroomSprite;

export const _drawItems = (ctx, items) => {
  if (items !== []) {
    items.forEach(item => {
      if (item.type === "Banana") {
        ctx.save();
        ctx.drawImage(bananaImg, item.pos[0], item.pos[1]);
        ctx.restore();
      } else if (item.type === "Coin") {
        ctx.save();
        ctx.drawImage(coinImg, item.pos[0], item.pos[1]);
        ctx.restore();
      } else {
        ctx.save();
        ctx.drawImage(mushroomImg, item.pos[0], item.pos[1]);
        ctx.restore();
      }
    });
  }
};
