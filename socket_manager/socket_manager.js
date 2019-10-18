import { io } from "../app";
import Game from "../src/classes/game";

//Have the server side store the game 'state', be able to modify the state, and also receive updates from the players

// Have the client side be able to receive and render the 'game' state sent by the server and also send out player actions to the server

export let gameState = {
  users: {},
  rooms: {}
  //gameState.rooms[roomInfo.roomId]
};

let clients = {};
// this happens when socket emmission is heard
// we will be calling game.gameloop()

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
    console.log("disconnected");
    console.log("socket.id", socket.id); 
    console.log("users", gameState.users);
    console.log("user", gameState.users[socket.id]); // is the player who disconnected
    console.log("rooms", gameState.rooms);
    console.log("game", gameState.rooms[socket.id]); // contains hostId and gameId, the room's URL

    if (!gameState.users[socket.id]) {
      return null;
    }

    let roomId = gameState.users[socket.id].gameId; // unique room URL
    console.log('roomId', roomId);
    let game = gameState.rooms[roomId]; //game that removed player was in
    console.log('game', game);
    if (socket.id) { // socket.id is room URL (unique room identifier)
      gameState.rooms[roomId].removePlayer(gameState.users[socket.id].id);
      delete gameState.users[socket.id];
      if (Object.keys(game.players).length === 0) {
        delete gameState.rooms[roomId];
      }
    }

    console.log("rooms", gameState.rooms);
  });
};

export default socketManager;
