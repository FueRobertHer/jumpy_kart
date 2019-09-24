import { io } from '../app';


//Have the server side store the game ‘state’, be able to modify the state, and also receive updates from the players

// Have the client side be able to receive and render the ‘game’ state sent by the server and also send out player actions to the server

export const gameState = {
  users: {},
  rooms: {}
};

const time = 60;

export const socketManager = (socket) => {
  // socket.on('addPlayer')
  //need to emit addPlayer from player component
  console.log("a user connected");

  socket.on("subscribeToTimer", (interval) => {
    setInterval(() => {
      socket.emit('timer', new Date());
    }, interval);
  });

  socket.on("disconnect", () => {
    console.log('user disconnected');
  });
};

export default socketManager;