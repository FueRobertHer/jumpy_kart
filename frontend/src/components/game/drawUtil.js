import marioSprite from '../../assets/images/mario_sprite.png';
import peachSprite from '../../assets/images/peach_sprite.png';
import toadSprite from '../../assets/images/toad_sprite.png';
import yoshiSprite from '../../assets/images/yoshi_sprite.png';
import pipeSprite from '../../assets/images/pipes_sprite.png';
import bananaSprite from '../../assets/images/banana.png';
import coinSprite from '../../assets/images/coin.png';
import mushroomSprite from '../../assets/images/mushroom.png';

export const _drawKart = (ctx, character, pos) => {
  if (character === 'mario') {
    let char = new Image(); // preset as player 1
    char.src = marioSprite;
    char.onload = () => {
      ctx.drawImage(char, pos[0], pos[1]);
    }
  } else if (character === 'peach') {
    let char = new Image(); // preset as player 2
    char.src = peachSprite;
    char.onload = () => {
      ctx.drawImage(char, pos[0], pos[1]);
    }
  } else if (character === 'toad') {
    let char = new Image(); // preset as player 2
    char.src = toadSprite;
    char.onload = () => {
      ctx.drawImage(char, pos[0], pos[1]);
    }
  } else {
    let char = new Image(); // preset as player 2
    char.src = yoshiSprite;
    char.onload = () => {
      ctx.drawImage(char, pos[0], pos[1]);
    }
  } 
}

export const _drawPipes = (ctx, pipes, items) => {
  return new Promise((resolve, reject) => {
    pipes.forEach(pipe => {
      let randomPipe = new Image();
      randomPipe.src = pipeSprite;
      randomPipe.onload = () => {
        ctx.drawImage(randomPipe, pipe.pos[0], pipe.height);
      }
    });

    console.log('items inside _drawPipes', items);
    if (items !== []) {
      items.forEach(item => {
          if (item.type === 'Banana') {
            let bananaImg = new Image();
            bananaImg.src = bananaSprite;
            bananaImg.onload = () => {
              ctx.drawImage(bananaImg, item.pos[0], item.pos[1]);
            }
          } else if (item.type === 'Coin') {
              let coinImg = new Image();
              coinImg.src = coinSprite;
              coinImg.onload = () => {
                ctx.drawImage(coinImg, item.pos[0], item.pos[1]);
              }
          } else {
              let mushroomImg = new Image();
              mushroomImg.src = mushroomSprite;
              mushroomImg.onload = () => {
                ctx.drawImage(mushroomImg, item.pos[0], item.pos[1]);
              }
          }
      });
    }

    resolve();
  })
}
