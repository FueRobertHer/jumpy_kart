import axios from 'axios';

export const createRoom = () => {
  return axios.get("/api/rooms")
}