import { Router } from 'express'
import * as gamesCtrl from "../controllers/games.js"
const router = Router()

router.get('/', isLoggedIn, gamesCtrl.index)


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

export { 
  router
}