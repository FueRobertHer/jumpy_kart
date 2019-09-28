import marioSprite from '../../assets/images/mario_sprite.png';
import peachSprite from '../../assets/images/peach_sprite.png';
import toadSprite from '../../assets/images/toad_sprite.png';
import yoshiSprite from '../../assets/images/yoshi_sprite.png';
import pipeSprite from '../../assets/images/pipes_sprite.png';
import io from 'socket.io-client';

let SERVER = io("http://localhost:5000", { transports: ['websocket'] });

if (process.env.NODE_ENV === "production") {
  console.log(`process.env: ${process.env}`);
  SERVER = process.env.REACT_APP_SERVER || 'http://jumpykart.herokuapp.com/#/';
}


export const _drawKart = (ctx, character) => {
  let socket = SERVER;
  let playerInfoObj;
  socket.on('playerJoined', data => {
    playerInfoObj = data.players;
  });


  if (character === 'mario') {
    let char = new Image(); // preset as player 1
    char.src = marioSprite;
    char.onload = () => {
      ctx.drawImage(char, 100, 419);
    }
  } else if (character === 'peach') {
    let char = new Image(); // preset as player 2
    char.src = peachSprite;
    char.onload = () => {
      ctx.drawImage(char, 100, 419);
    }
  } else if (character === 'toad') {
    let char = new Image(); // preset as player 2
    char.src = toadSprite;
    char.onload = () => {
      ctx.drawImage(char, 100, 419);
    }
  } else {
    let char = new Image(); // preset as player 2
    char.src = yoshiSprite;
    char.onload = () => {
      ctx.drawImage(char, 100, 419);
    }
  } 
}

export const _drawPipes = (ctx, pipes) => {
  return new Promise((resolve, reject) => {
    pipes.forEach(pipe => {
      let randomPipe = new Image();
      randomPipe.src = pipeSprite;
      randomPipe.onload = () => {
        ctx.drawImage(randomPipe, pipe.pos[0], pipe.height);
      }
    });
    resolve();
  })
}
