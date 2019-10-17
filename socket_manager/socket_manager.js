import { io } from "../app";
import Game from "../src/classes/game";

//Have the server side store the game 'state', be able to modify the state, and also receive updates from the players

// Have the client side be able to receive and render the 'game' state sent by the server and also send out player actions to the server

export const gameState = {
  users: {},
  rooms: {}
  //gameState.rooms[roomInfo.roomId]
};

export const socketManager = socket => {
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
      socket.id = roomInfo.userId;
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
        socket.id = gameState.rooms[roomInfo.roomId].gameId;
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

  socket.on("disconnect", () => { // do something here to remove players from games
    console.log("user disconnected"); // also consider denying access to started games?
    // if (!gameState.users[socket.id]) {
    //   return null;
    // }
    // console.log('socket.id', socket.id);
    // console.log('gameState', gameState);
    // console.log('gameState.users', gameState.users)
    // console.log('gameState.rooms', gameState.rooms)
    // let roomId = gameState.users[socket.id].gameId;
    // let game = gameState.rooms[roomId];
    // if (socket.id) {
    //   game.removePlayer(socket.id);
    //   delete gameState.users[socket.id];
    //   if (Object.keys(game.players).length === 0) {
    //     delete gameState.rooms[roomId];
    //   }
    // }
  });
};

export default socketManager;
