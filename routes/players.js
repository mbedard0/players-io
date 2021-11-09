import { Router } from 'express'
import * as playersCtrl from "../controllers/players.js"
const router = Router()

router.post('/search', isLoggedIn, playersCtrl.search)

router.get('/:id', isLoggedIn, playersCtrl.show)

router.patch('/:id/addPlayer', isLoggedIn, playersCtrl.addPlayer)

router.patch('/:id/removePlayer', isLoggedIn, playersCtrl.removePlayer)

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

export {
  router
}