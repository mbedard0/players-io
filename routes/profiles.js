import { Router } from 'express'
import * as profilesCtrl from "../controllers/profiles.js"
const router = Router()

router.get('/', function(req, res) {
  res.render('index', { title: 'Players.io' })
})

// router.get('/all', isLoggedIn, profilesCtrl.index)

// router.get('/:id', isLoggedIn, profilesCtrl.show)


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

export { 
  router
}