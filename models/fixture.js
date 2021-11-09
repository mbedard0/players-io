import mongoose from 'mongoose'
const Schema = mongoose.Schema

const fixtureSchema = new Schema({
  date: Date,
  homeTeam: String,
  awayTeam: String,
  fixtureId: {type: Number},
  teams: [{type: Schema.Types.ObjectId, ref: 'Team'}],
  boardPosts: [{type: Schema.Types.ObjectId, ref: 'boardPostSchema'}]
})

const Fixture = mongoose.model('Fixture', fixtureSchema)

export {
  Fixture,
}