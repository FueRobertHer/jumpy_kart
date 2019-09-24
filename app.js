import express from 'express';
const mongoose = require('mongoose');
const app = express();
const server = require('http').Server(app);
export const io = require('socket.io')(server);

import { mongoURI as db } from './config/keys';
import { urlencoded, json } from 'body-parser';
import passport from 'passport';
const path = require("path");

import users from "./routes/api/users";

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
// app.listen(port, () => console.log(`Server is running on port ${port}`));

server.listen(PORT, () => {
  console.log(`listening on localhost ${PORT}`)
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('sample', (example) => {
    console.log('sample: ' + example);
  });
});

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use(passport.initialize());  
require('./config/passport').default(passport);

app.use(urlencoded({ extended: false }));
app.use(json());

app.use("/api/users", users);




