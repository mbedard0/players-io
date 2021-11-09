import { Router } from 'express'
import * as fixturesCtrl from "../controllers/fixtures.js"
const router = Router()

router.get('/', isLoggedIn, fixturesCtrl.index)

router.get('/:id', isLoggedIn, fixturesCtrl.show)

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

export { 
  router
}