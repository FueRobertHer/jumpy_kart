import { Router } from "express";
const router = Router();
import { genSalt, hash as _hash, compare } from 'bcryptjs';
import User from '../../models/User';
import { sign } from 'jsonwebtoken';
import { secretOrKey } from '../../config/keys';
import passport from 'passport';

import validateRegisterInput from '../../validation/register';
import validateLoginInput from '../../validation/login';

router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.body.id,
    username: req.body.username,
  });
})

router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Check to make sure nobody has already registered with a duplicate username
  User.findOne({ username: req.body.username })
    .then(user => {
      if (user) {
        // Throw a 400 error if the username  already exists
        return res.status(400).json({ username: "Somebody has already registered with this username" })
      } else {
        // Otherwise create a new user
        const newUser = new User({
          username: req.body.username,
          password: req.body.password
        })


        genSalt(10, (err, salt) => {
          _hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                const payload = { id: user.id, username: user.username };

                sign(
                  payload,
                  secretOrKey,
                  // Tell the key to expire in one day
                  { expiresIn: 86400 },
                  (err, token) => {
                    res.json({
                      success: true,
                      token: 'Bearer ' + token
                    });
                  });
              })
              .catch(err => console.log(err));
          });
        });

      }
    })
})


router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  console.log(errors);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username })
    .then(user => {
      if (!user) {
        return res.status(404).json({ username: 'This user does not exist' });
      }

      compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const payload = { id: user.id, username: user.username, coins: user.coins };

            sign(
              payload,
              secretOrKey,
              // Tell the key to expire in one day
              { expiresIn: 86400 },
              (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token,
                  payload
                });
              });
          } else {
            return res.status(400).json({ password: 'Incorrect password' });
          }
        })
    })
})

router.patch('/update', (req, res) => {
  const userId = req.body.id;
  const coins = req.body.coins;

  User.findOne({ _id: userId })
    .then(user => {
      // user.update({coins: coins});
      const totalCoins = parseInt(user.coins) + parseInt(coins);
      user.coins = totalCoins;
      user.save();
      res.json(user);
    })
})

router.get('/highscore', (req, res) => {
  User.find()
    .sort({coins: -1})
    .then(players => res.json(players).slice(0, 10))
})

export default router;