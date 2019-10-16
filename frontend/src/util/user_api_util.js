import axios from 'axios';

export const updateCoin = (userData) => {
  //userData should contain userId under the key of id and coins value under key of coins
  return axios.patch('/api/users/update', userData);
}