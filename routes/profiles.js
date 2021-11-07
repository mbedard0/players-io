import { Router } from 'express'
import * as profilesCtrl from "../controllers/profiles.js"
const router = Router()

router.get('/', profilesCtrl.index)

router.get('/:id', isLoggedIn, profilesCtrl.show)


// router.get('/all', isLoggedIn, profilesCtrl.index)


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

export { 
  router
}