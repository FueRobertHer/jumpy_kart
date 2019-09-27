import { io } from '../app';
import Game from '../src/classes/game';


//Have the server side store the game ‘state’, be able to modify the state, and also receive updates from the players

// Have the client side be able to receive and render the ‘game’ state sent by the server and also send out player actions to the server

export const gameState = {
  users: {},
  rooms: {}
};

export const socketManager = (socket) => {
  
  console.log('a user connected');
  //test case - on connection, render game
  let game = new Game();
  socket.on('loadGame', () => {
    console.log('loading game');
    game.loadGame(socket);
  });

  socket.on('roomInfo', roomInfo => {
    socket.id = roomInfo.userId;
    console.log(roomInfo.type)

    game = new Game(roomInfo.roomId, socket.id)
    let player;
    if (game) {
      player = game.addPlayer(roomInfo.userId, socket);
      gameState.users[player] = player;
      console.log(game);
    }
    // console.log("roomid", roomInfo.roomId, "userId", roomInfo.userId );

    // if (roomInfo.type === "createRoom") {
    //   console.log("in create room")
    //   game = gameState.rooms[roomInfo.roomId] = new Game(roomInfo.roomId, socket.id);
   
    // } else {
    //   game = gameState.rooms[roomInfo.roomId];
    // }

  });


  socket.on('subscribeToTimer', (interval) => {
    setInterval(() => {
      socket.emit('timer', new Date());
    }, interval);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
};

export default socketManager;