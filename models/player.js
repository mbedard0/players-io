import mongoose from 'mongoose'
const Schema = mongoose.Schema

const playerSchema = new Schema({
  name: String,
  team: {type: Schema.Types.ObjectId, ref: 'Team'},
  gamesPlayed: Number,
  goals: Number,
  passes: Number,
  yellowCards: Number,
  redCards: Number
}, {
  timestamps: true
})

const Player = mongoose.model('Player', playerSchema)

export {
  Player
}