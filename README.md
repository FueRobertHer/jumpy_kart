# Jumpy Kart

<p width="700" align="center">
  <img src="./frontend/src/assets/images/readme/splash.gif" width="700">
</p>

---

[Play Jumpy Kart Now!](https://jumpykart.herokuapp.com)

Jumpy Kart is a Mario-themed take on a Flappy Bird-esque platformer. But, this time it's multiplayer! Play with your friends in games of up-to four people.

---

## Technologies

Jumpy Kart is built using the MERN stack: MongoDB and Express make up the backend while React, Redux, and Node.js make up the frontend. Jumpy Kart implements WebSockets (<span>Socket.IO<span>) to create private game rooms for you and your friends. The game is drawn using HTML Canvas.

---

## Features

- Users can play solo or with friends, both in private rooms
- Users can create an account to accrue coins over time
- Users compete for classic Mario coins to gain a spot on the scoreboard
- Powerups and obstacles are randomly generated each race to keep users on their feet
- WebSockets continuously emit game state to update game responsiveley in real time
- Game can be played on both  desktop and mobile

---

### Game Rooms

- Each game is private and supports up to four players. A host creates a room then shares the URL with friends. All players have their own viewport on their own device but can see all character sprites in their vicinity. The viewport follows the user as they drive through the map.
- Concurrent games enabled for multiple rooms at a given time.

<p width="350" align="center">
  <img src="./frontend/src/assets/images/readme/join_game_room.png" width="350">
</p>

---

### High Score Board

- When a racer picks up coins during a race, the total will be added to their user account. When finishing a race in 1st, 2nd, or 3rd place, they will also earn coins and their account will update. Earning enough coins will land them on the leaderboard.

<p width="450" align="center">
  <img src="./frontend/src/assets/images/readme/high_score.png" width="450">
</p>

---

### Randomized Map

- The map generates items and obstacles (pipes) every race. The pipe locations and heights are random to maintain an element of surprise each race. Items (bananas, mushrooms, coins) are also randomized and will appear around the random pipes each race. The amount of items increase with the amount of players in the room!

<img src="./frontend/src/assets/images/readme/items.png" >

---

### WebSockets (<span>Socket.IO<span>)

- Each player has a unique socket to connect to game and access it's state. As players move, new positions are calculated and emitted to every player in the game room.

```javascript
emitUpdateGame() {
  // only emitting to sockets in current game/room
  Object.values(this.playerSockets).forEach(socket => {
    socket.emit("placeItems", {
      // emitting pipe locations
      pipes: this.pipes.map(pipe => ({
        pos: pipe.pos,
        width: pipe.width,
        height: pipe.height
      })),
      // emitting item locations
      items: this.allItems.map(item => ({
        pos: item.pos,
        type: item.type
      }))
    });

    // emitting player positions
    socket.emit("updateGameState", {
      hostId: this.hostId,
      gameId: this.gameId,
      players: this.playerInfoObject
    });
  })
}
```

---

### Canvas Drawing

- Every game frame is drawn locally using information from socket emissions. Every player will see their own character sprite drawn on top as to not have their view obscured by other racers.

<p width="450" align="center">
  <img src="./frontend/src/assets/images/readme/sprite_drawing.png" width="450">
</p>

Utilize two canvas elements. The first one draws the whole map and is hidden. The second draws only a section around the player.

```
<canvas id='background' ref='canvas' width='10500' height='500' /> 
<canvas id='viewport' ref='viewport' width='600' height='500' />
```

```
// get user id and find player with that id
const currentUserID = this.props.location.userId;
let currentUser;
this.state.players.forEach(player => {
  if (player.id === currentUserID) currentUser = player;
});

// get x position of the player
const x = currentUser ? currentUser.pos[0] : 0;

// draw unique camera for each player
const viewport = this.refs.viewport;
const cam = viewport.getContext("2d");
cam.clearRect(0, 0, viewport.width, viewport.height);
cam.drawImage(
  canvas, // the full stage
  x - viewport.width / 4,
  0,
  viewport.width,
  viewport.height,
  0,
  0,
  viewport.width,
  viewport.height
```

---

### Progress Tracker

- Racers are given a real-time representation of race progress in relation to their competitors.

<p width="325" align="center">
  <img src="./frontend/src/assets/images/readme/progress_tracker.png" width="325">
</p>

---

## Jumpy Kart Team

- Owen Haupt - [Github](https://github.com/owenshaupt) | [LinkedIn](https://www.linkedin.com/in/owenshaupt/) | [Portfolio](https://owenhaupt.io/)
- Fue Her - [Github](https://github.com/FueRobertHer) | [LinkedIn](https://www.linkedin.com/in/fue-her/) | [Portfolio](https://fueher.com/)
- Andrew Huang - [Github](https://github.com/andrewhuangg) | [LinkedIn](https://www.linkedin.com/in/anuhangg/) | [Portfolio](https://andrewhuang.io)
- Taehoon Song - [Github](https://github.com/TSong23) | [LinkedIn](https://www.linkedin.com/in/taehoonsong94/) | [Portfolio](https://taehoonsong.dev/)
