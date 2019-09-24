import { io } from '../app';

export const gameState = {
  users: {},
  rooms: {}
};


//Have the server side store the game ‘state’, be able to modify the state, and also receive updates from the players

// Have the client side be able to receive and render the ‘game’ state sent by the server and also send out player actions to the server

export const socketManager = (socket) => {
  // socket.on('addPlayer')
  //need to emit addPlayer from player component

  
};