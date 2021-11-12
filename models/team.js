import mongoose from 'mongoose'
const Schema = mongoose.Schema


// this is currently in the icebox and not used
const teamSchema = new Schema({
  name: String,
  position: Number,
  crest: String,
  leagueId: {type: Number, default: 39},
  games: [{type: Schema.Types.ObjectId, ref: 'Game'}],
  playerList: [{type: Schema.Types.ObjectId, ref: 'Player'}]
}, {
  timestamps: true
})

const Team = mongoose.model('Team', teamSchema)

export {
  Team
}