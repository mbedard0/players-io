import mongoose from 'mongoose'
const Schema = mongoose.Schema

const playerSchema = new Schema({
  name: String,
  team: String,
  teamId: {type: Schema.Types.ObjectId, ref: 'Team'},
  apiId: Number, // this is given by the API
  // season: {type: Number, default: function() {
  //     let date = new Date()
  //     date.setFullYear(date.getFullYear())
  //     return date
  //   }}, // date is required by the API to give stats by season
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