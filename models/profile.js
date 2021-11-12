import mongoose from 'mongoose'
const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  avatar: String,
  playerList: [{type: Schema.Types.ObjectId, ref: 'Player'}],
  boardPosts: [{type: Schema.Types.ObjectId, ref: 'BoardPost'}]
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}