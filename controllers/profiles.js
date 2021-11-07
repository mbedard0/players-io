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

}


export {
  index,
  show
}