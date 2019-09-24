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
import socketManager from './socket_manager/socket_manager';

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

io.on('connection', socketManager);

server.listen(PORT, () => {
  console.log(`listening on localhost ${PORT}`);
});


mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use(passport.initialize());  
require('./config/passport').default(passport);

app.use(urlencoded({ extended: false }));
app.use(json());

app.get('/', (req, res) => {
  res.send('this app is working boiiii');
});

app.use("/api/users", users);




