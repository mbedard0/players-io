import mongoose from 'mongoose'
const Schema = mongoose.Schema

const boardPostSchema = new Schema({
  content: {type: String, required: true},
  author: {type: Schema.Types.ObjectId, ref: 'Profile'},
  game: {type: Schema.Types.ObjectId, ref: 'Game'}
}, {
  timestamps: true
})

const BoardPost = mongoose.model('BoardPost', boardPostSchema)

export {
  BoardPost
}