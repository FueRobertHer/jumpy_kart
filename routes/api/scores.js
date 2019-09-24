const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Score = require('../../models/Score');

router.get('/', (req,res) => {
  Score.find()
    .sort({value: 'desc'})
    .then(scores => res.json(scores))
    .catch(err => res.status(404).json({ noscoresfound: "No Scores found"}))
});

router.get('/user/:user_id', (req, res) => {
  Score.find({user: req.params.user_id})
    .then(scores => res.json(scores))
    .catch(err => 
      res.status(404).json({ noscoresfound: "No Scores found" })
    )
})

router.post('/',

  //passport makes sure that user key is present
  passport.authenticate('jwt', { session: false}),
  (req, res) => {  
    const newScore = new Score({
      username: req.body.username,
      value: req.body.score,
    })
  }
) 