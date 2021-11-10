import mongoose from 'mongoose'
const Schema = mongoose.Schema

const boardPostSchema = new Schema({
  content: {type: String, required: true},
  author: {type: Schema.Types.ObjectId, ref: 'Profile'},
  fixtureId: {type: Number},
}, {
  timestamps: true
})

const BoardPost = mongoose.model('BoardPost', boardPostSchema)

export {
  BoardPost
}