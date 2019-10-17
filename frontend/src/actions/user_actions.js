import * as APIUtil from '../util/user_api_util';

export const RECEIVE_UPDATE_COINS = "RECEIVE_UPDATE_COINS";

export const receiveUpdateCoins = () => ({
  type: RECEIVE_UPDATE_COINS
});

export const updateCoins = user => {
  APIUtil.updateCoins(user)
    .catch( err => {console.log(err)})
}