import { Profile } from '../models/profile.js'

function index(req, res) {
  Profile.find({})
  .then(profiles => {
    res.render('profiles/index', {
      profiles,
      title: 'View all profiles',
    })
  })
  .catch(e =>  {
    console.log(e)
  })
  }

function show(req, res) {
  Profile.findById(req.params.id)
  .populate('playerList')
  .populate('boardPosts')
  .then((profile) => {
    Profile.findById(req.user.profile)
    .then(userProfile => {
      res.render('profiles/show', {
        profile,
        userProfile,
        title: `${profile.name}'s profile`,
      })
    })
  })
}

export {
  index,
  show
}