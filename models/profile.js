import mongoose from 'mongoose'
const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  avatar: String,
  playerList: [{type: Schema.Types.ObjectId, ref: 'Player'}],
  // playerList : [{3247390}, {328974320}]
  // playerList: [{firstname: String, lastname: String}]
  boardPosts: [{type: Schema.Types.ObjectId, ref: 'BoardPost'}]
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}