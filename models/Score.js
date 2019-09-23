const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
  username: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  value: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Score = mongoose.model('scores', ScoreSchema);