import * as APIUtil from '../util/user_api_util';

export const RECEIVE_UPDATE_COINS = "RECEIVE_UPDATE_COINS";
export const RECEIVE_HIGH_SCORE = "RECEIVE_HIGH_SCORE";

export const receiveUpdateCoins = () => ({
  type: RECEIVE_UPDATE_COINS
});

export const receiveHighScore = players => ({
  type: RECEIVE_HIGH_SCORE,
  players
})

export const updateCoins = user => {
  APIUtil.updateCoins(user)
    .catch( err => {console.log(err)})
}

export const fetchHighScore = () => dispatch => {
  APIUtil.fetchHighScore()
    .then(players => (dispatch(receiveHighScore(players)) ))
    .catch(err => {console.log(err)})
}