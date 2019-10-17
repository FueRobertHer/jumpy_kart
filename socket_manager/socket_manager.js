import { io } from "../app";
import Game from "../src/classes/game";

//Have the server side store the game 'state', be able to modify the state, and also receive updates from the players

// Have the client side be able to receive and render the 'game' state sent by the server and also send out player actions to the server

export const gameState = {
  users: {},
  rooms: {}
  //gameState.rooms[roomInfo.roomId]
};

<<<<<<< HEAD
let clients = {};
// this happens when socket emmission is heard
// we will be calling game.gameloop()

=======
>>>>>>> 0f7237e96bfb4870cc6debf1cae227d12bc0cb10
export const socketManager = socket => {

  clients[socket.id] = socket;
  
  console.log("a user connected");
  //test case - on connection, render game
  let game;
  let player;

  socket.on("startGame", () => {
    console.log("inside gameloop.on");
    game.gameloop(socket);
  });

  socket.on("roomInfo", roomInfo => {
    if (roomInfo.type === "createRoom") {
      // socket.id = roomInfo.userId;
      socket.id = roomInfo.roomId;
      gameState.rooms[roomInfo.roomId] = new Game(roomInfo.roomId, socket.id);
      game = gameState.rooms[roomInfo.roomId];
      socket.on("loadGame", () => {
        console.log("loading game");
        game.loadGame(socket);
      });

      gameState.users[socket.id] = game.addPlayer(
        roomInfo.userId,
        socket,
        roomInfo.roomId
      );
      player = gameState.users[socket.id];

      socket.on("pressSpace", () => {
        if (player) {
          player.jump(socket);
        }
      });
    }

    if (roomInfo.type === "joinRoom") {
      if (gameState.rooms[roomInfo.roomId].gameId === roomInfo.roomId) {
        // socket.id = gameState.rooms[roomInfo.roomId].gameId;
        socket.id = roomInfo.roomId;
        game = gameState.rooms[roomInfo.roomId];
        socket.on("loadGame", () => {
          console.log("loading game");
          game.loadGame(socket);
        });
        gameState.users[roomInfo.userId] = game.addPlayer(
          roomInfo.userId,
          socket
        );
        player = gameState.users[roomInfo.userId];

        socket.on("pressSpace", () => {
          if (player) {
            player.jump(socket);
          }
        });
      } else {
        return null;
      }
    }
  });

  socket.on("disconnect", () => {
    console.log('disconnected')
    // let playerId = gameState.users[socket.id]
    // let gameId = gameState.rooms[socket.id]
    if (socket.id) {
      console.log('user', gameState.users[socket.id], 'game', gameState.rooms[socket.id])
      delete gameState.users[socket.id]
      delete gameState.rooms[socket.id]
    }
    console.log(socket.id)
    // console.log(gameState)
    // console.log(socket.id)
    // delete clients[socket.id]
    // if (player) delete player
    // if (game) delete game
    

  });
};

export default socketManager;
