import mario from '../../assets/images/mario_sprite.png';
import peach from '../../assets/images/peach_sprite.png';
import toad from '../../assets/images/toad_sprite.png';
import yoshi from '../../assets/images/yoshi_sprite.png';
import pipeSprite from '../../assets/images/pipes_sprite.png';
import bananaSprite from '../../assets/images/banana.png';
import coinSprite from '../../assets/images/coin.png';
import mushroomSprite from '../../assets/images/mushroom.png';
// export const _drawKart = (ctx, player) => {
//   let sprite = new Image();
//   sprite.src = window.URL.createObjectURL(`../../assets/images/${player.sprite}_sprite.png`);
//   // sprite.onload = () => {
//     // ctx.save();
//   ctx.drawImage(sprite, player.pos[0], player.pos[1]);
//     // ctx.restore();
//   // }
// }
export const _drawKart = (ctx, player) => {
  if (player.sprite === 'mario') {
    let char = new Image(); // preset as player 1
    char.src = mario;
    // char.onload = () => {
    ctx.save();
    ctx.drawImage(char, player.pos[0], player.pos[1]);
    ctx.restore();
    // }
  } else if (player.sprite === 'peach') {
    let char = new Image(); // preset as player 2
    char.src = peach;
    // char.onload = () => {
    ctx.save();
    ctx.drawImage(char, player.pos[0], player.pos[1]);
    ctx.restore();
    // }
  } else if (player.sprite === 'toad') {
    let char = new Image(); // preset as player 2
    char.src = toad;
    // char.onload = () => {
    ctx.save();
    ctx.drawImage(char, player.pos[0], player.pos[1]);
    ctx.restore();
    // }
  } else {
    let char = new Image(); // preset as player 2
    char.src = yoshi;
    // char.onload = () => {
    ctx.save();
    ctx.drawImage(char, player.pos[0], player.pos[1]);
    ctx.restore();
    // }
  }
}
export const _drawPipes = (ctx, pipes) => {
  return new Promise(resolve => {
    pipes.forEach(pipe => {
      let randomPipe = new Image();
      randomPipe.src = pipeSprite;
      // randomPipe.onload = () => {
      ctx.save();
      ctx.drawImage(randomPipe, pipe.pos[0], pipe.height);
      ctx.restore();
      // }
    });

    resolve();
  })
}
export const _drawItems = (ctx, items) => {
  if (items !== []) {
    items.forEach(item => {
      if (item.type === 'Banana') {
        let bananaImg = new Image();
        bananaImg.src = bananaSprite;
        // bananaImg.onload = () => {
        ctx.save();
        ctx.drawImage(bananaImg, item.pos[0], item.pos[1]);
        ctx.restore();
        // }
      } else if (item.type === 'Coin') {
        let coinImg = new Image();
        coinImg.src = coinSprite;
        // coinImg.onload = () => {
        ctx.save();
        ctx.drawImage(coinImg, item.pos[0], item.pos[1]);
        ctx.restore();
        // }
      } else {
        let mushroomImg = new Image();
        mushroomImg.src = mushroomSprite;
        // mushroomImg.onload = () => {
        ctx.save();
        ctx.drawImage(mushroomImg, item.pos[0], item.pos[1]);
        ctx.restore();
        // }
      }
    }
    )
  }
}





