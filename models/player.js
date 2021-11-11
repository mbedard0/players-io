import mongoose from 'mongoose'
const Schema = mongoose.Schema

const playerSchema = new Schema({
  firstName: String,
  lastName: String,
  team: String,
  teamId: {type: Schema.Types.ObjectId, ref: 'Team'},
  apiId: Number, 
  gamesPlayed: Number,
  goals: Number,
  passes: Number,
  keyPasses: Number,
  saves: Number,
  yellowCards: Number,
  redCards: Number
}, {
  timestamps: true
})

const Player = mongoose.model('Player', playerSchema)

export {
  Player
}