import { Router } from 'express'
import * as teamsCtrl from "../controllers/teams.js"
const router = Router()

router.get('/', isLoggedIn, teamsCtrl.index)


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

export { 
  router
}