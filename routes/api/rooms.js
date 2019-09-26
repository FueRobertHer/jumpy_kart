import { Router } from "express";
const router = Router();

router.get('/'), (req, res) => {
  let roomId = Math.random().toString(36).slice(3, 11); //returns a random 8 char string
  res.json({roomId})
}

export default router;