import mongoose from 'mongoose'
const Schema = mongoose.Schema

const teamSchema = new Schema({
  name: String,
  position: Number,
  crest: String,
  games: [{type: Schema.Types.ObjectId, ref: 'Game'}],
  playerList: [{type: Schema.Types.ObjectId, ref: 'Player'}]
}, {
  timestamps: true
})

const Team = mongoose.model('Team', teamSchema)

export {
  Team
}