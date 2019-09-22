import express from "express";
const mongoose = require('mongoose');
const app = express();
import { mongoURI as db } from './config/keys';
import { urlencoded, json } from 'body-parser';
import passport from 'passport';

import users from "./routes/api/users";
// import tweets from "./routes/api/tweets";

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use(passport.initialize());
require('./config/passport').default(passport);

app.use(urlencoded({ extended: false }));
app.use(json());

app.use("/api/users", users);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));