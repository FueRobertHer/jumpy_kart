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
    console.log('rooms pre-create', gameState.rooms)
    if (roomInfo.type === "createRoom") {
      socket.id = Math.random();
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
      console.log('rooms post-create', gameState.rooms)
    }

    if (roomInfo.type === "joinRoom") {
      console.log('rooms pre-join', gameState.rooms)
      if (gameState.rooms[roomInfo.roomId].gameId === roomInfo.roomId) {
        socket.id = Math.random();
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
      } else {
        return null;
      }
      console.log('rooms post-join', gameState.rooms)
    }
  });

  socket.on("disconnect", () => {
    console.log("disconnecting");

    if (!gameState.users[socket.id]) {
      return null;
    }

    let roomId = gameState.users[socket.id].gameId;
    let game = gameState.rooms[roomId];

    // socket.id is unique to each player
    if (socket.id) {
      gameState.rooms[roomId].removePlayer(gameState.users[socket.id].id);
      delete gameState.users[socket.id];
      console.log("socket", socket);
      socket.conn.close();
      socket.disconnect(true);

      if (Object.keys(game.players).length === 0) {
        delete gameState.rooms[roomId];
      }
    }

    // will display remaining open rooms
    console.log("rooms", gameState.rooms);
  });
};

export default socketManager;
