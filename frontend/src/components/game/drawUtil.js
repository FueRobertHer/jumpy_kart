import marioSprite from '../../assets/images/mario_sprite.png';
import peachSprite from '../../assets/images/peach_sprite.png';
import toadSprite from '../../assets/images/toad_sprite.png';
import yoshiSprite from '../../assets/images/yoshi_sprite.png';
import pipeSprite from '../../assets/images/pipes_sprite.png';

export const _drawKart = (ctx, player) => {

  let mario = new Image();
  mario.src = marioSprite;
  mario.onload = () => {
    ctx.drawImage(mario, 100, 100); // max y-coord will be
                                    // height of canvas element
  }

  let peach = new Image();
  peach.src = peachSprite;
  peach.onload = () => {
    ctx.drawImage(peach, 100, 100);
  }

  let toad = new Image();
  toad.src = toadSprite;
  toad.onload = () => {
    ctx.drawImage(toad, 100, 100);
  }

  let yoshi = new Image();
  yoshi.src = yoshiSprite;
  yoshi.onload = () => {
    ctx.drawImage(yoshi, 100, 100);
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

export const _drawPipes = (ctx, pipes) => {
  pipes.forEach(pipe => {
    let randomPipe = new Image();
    randomPipe.src = pipeSprite;
    randomPipe.onload = () => {
      ctx.drawImage(randomPipe, pipe.location, pipe.height);
    }
  });

  // let pipe = new Image();
  // pipe.src = pipeSprite;
  // pipe.onload = () => {
  //   ctx.drawImage(pipe, 300, 150);
  // }
}
