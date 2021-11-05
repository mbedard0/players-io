import mongoose from 'mongoose'
const Schema = mongoose.Schema

const gameSchema = new Schema({
  date: Date,
  teams: [{type: Schema.Types.ObjectId, ref: 'Team'}],
  boardPosts: [{type: Schema.Types.ObjectId, ref: 'boardPostSchema'}]
})

const Game = mongoose.model('Game', gameSchema)

export {
  Game,
}