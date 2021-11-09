import { Fixture } from "../models/fixture.js";
import { BoardPost } from "../models/boardpost.js"
import axios from "axios";
import { Profile } from "../models/profile.js";
import { Player } from "../models/player.js";

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
      // console.log(response.data.response)
      res.render('fixtures/show', {
        title: `Fixture Details`,
        results: response.data.response,
      })
    })
    .catch(e => {
      console.log(e)
    })
}

function createMessage(req, res) {
  // console.log(req.body)
  // create new board post
  BoardPost.create(req.body)
  .then(post => {
    // Fixture.findById(req.params.id)
    // .then(fixture => {
      // find profile of user (user.profile._id)
      // fixture.boardPosts.push(post._id)
      // fixture.save()
      Profile.findById(req.user.profile._id)
      .then(profile => {
        // push and save board post id number to profile
        profile.boardPosts.push(post._id)
        profile.save()
        .then(() => {
          res.redirect(`/fixtures/${req.params.id}`)
        })
      // })
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