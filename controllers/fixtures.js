import { Fixture } from "../models/fixture.js";
import { BoardPost } from "../models/boardpost.js"
import axios from "axios";
import { Profile } from "../models/profile.js";

function index(req, res) {
  axios.get(`https://v3.football.api-sports.io/fixtures`,
    {
      params: { season: 2021, league: 39 },
      headers: {
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-rapidapi-key': process.env.API_KEY
      }
    })
    .then(response => {
      res.render('fixtures/index', {
        title: `2021-2022 Fixtures`,
        results: response.data.response,
      })
    })
    .catch(e => {
      console.log(e)
    })
}

function show(req, res) {
  axios.get(`https://v3.football.api-sports.io/fixtures`,
    {
      params: { id: req.params.id },
      headers: {
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-rapidapi-key': process.env.API_KEY
      }
    })
    .then(response => {
      Fixture.find({fixtureId: req.params.id})
      // deep populate authors on boardposts
      .populate({
        path : 'boardPosts',
        populate : {
          path : 'author'
        }
      })
      .then(fixture => {
        // fix date to be more readable
        let utcDate = response.data.response[0]['fixture']['date']
        let localDate = new Date(utcDate)
        let readableDate = localDate.toDateString()
        res.render('fixtures/show', {
        title: `Fixture Details`,
        fixture,
        readableDate,
        results: response.data.response,
      })
    })
    .catch(e => {
      console.log(e)
    })
  })
}

function createMessage(req, res) {
  // find the fixture to create the message on
  Fixture.findOne({fixtureId: req.body.fixtureId})
    .then(fixture => {
      // if the fixture exists in the database return, otherwise create a new one
      // saving the fixture here allows us to reference board posts within the fixture model
      if (fixture) {
        return
      } else {
        Fixture.create(req.body)
    }
  })
  // create new board post
  BoardPost.create(req.body)
  .then(post => {
    Fixture.findOne({fixtureId: req.body.fixtureId})
    .then(fixture => {
      // find profile of user (user.profile._id)
      fixture['boardPosts'].push(post._id)
      fixture.save()
      Profile.findById(req.user.profile._id)
      .then(profile => {
        // push and save board post id number to profile
        profile.boardPosts.push(post._id)
        profile.save()
        .then(() => {
          res.redirect(`/fixtures/${req.params.id}`)
        })
      })
  })
  .catch(e => {
    console.log(e)
  })
  })
}

export {
  index,
  show,
  createMessage
}