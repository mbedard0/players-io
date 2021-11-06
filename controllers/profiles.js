import { Profile } from '../models/profile.js'
function index(req, res) {
  Profile.find({}, function(error, profiles) {
    res.render('profile/index', {
      profiles,
      title: 'View all profiles'
    })
  })
}

export {
  index
}