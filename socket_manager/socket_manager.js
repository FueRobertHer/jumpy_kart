import { io } from '../app';
import Game from '../src/classes/game';


//Have the server side store the game 'state', be able to modify the state, and also receive updates from the players

// Have the client side be able to receive and render the 'game' state sent by the server and also send out player actions to the server

export const gameState = {
  users: {},
  rooms: {}
  //gameState.rooms[roomInfo.roomId]
};


export const socketManager = (socket) => {

  console.log('a user connected');
  //test case - on connection, render game
  let game;
  let player;

  socket.on('roomInfo', roomInfo => {

    if (roomInfo.type === "createRoom") {
      socket.id = roomInfo.userId;
      console.log('roomInfo.userId')
      console.log(roomInfo.userId)
      gameState.rooms[roomInfo.roomId] = new Game(roomInfo.roomId, socket.id);
      game = gameState.rooms[roomInfo.roomId];
      console.log('game');
      console.log(game);
      socket.on('loadGame', () => {
        console.log('loading game');
        game.loadGame(socket);
      });
      gameState.users[socket.id] = game.addPlayer(roomInfo.userId, socket, roomInfo.roomId);
      player = gameState.users[socket.id];

      socket.on('btnDown', () => {
        if (player) {
          player.jump();
        }
      });
    } 

    if (roomInfo.type === "joinRoom") {
      if (gameState.rooms[roomInfo.roomId].gameId === roomInfo.roomId) {
        socket.id = gameState.rooms[roomInfo.roomId].gameId;
        game = gameState.rooms[roomInfo.roomId];
        socket.on('loadGame', () => {
          console.log('loading game');
          game.loadGame(socket);
        });
        gameState.users[roomInfo.userId] = game.addPlayer(roomInfo.userId, socket);
        player = gameState.users[roomInfo.userId];

        socket.on('btnDown', () => {
          if (player) {
            player.jump();
          }
        });
        
      } else {
        return null;
      }
    }

    

  });


  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

};

export default socketManager; 