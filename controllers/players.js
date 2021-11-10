import { Player } from "../models/player.js";
import axios from "axios";
import { Profile } from "../models/profile.js";

function search(req, res) {
  axios.get(`https://v3.football.api-sports.io/players`,
    {
      params: { search: req.body.search, league: 39 },
      headers: {
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-rapidapi-key': process.env.API_KEY
      }
    })
    .then(response => {
      res.render('players/results', {
        title: `Search`,
        results: response.data
      })
    })
    .catch(e => {
      console.log(e)
    })
}

function show(req, res) {
  axios.get(`https://v3.football.api-sports.io/players`,
    {
      params: { id: req.params.id, league: 39, season: 2021 },
      headers: {
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-rapidapi-key': process.env.API_KEY
      }
    })
    .then(response => {
      res.render('players/show', {
        title: `Player details`,
        results: response.data.response,
      })
    })
    .catch(e => {
      console.log(e)
    })
}

function addPlayer(req, res) {
  // find the player by the id which is
  Player.findOne({ apiId: req.body.apiId })
    .then(player => {
      // if it does exist, then use the existing player id to push to the profile playerlist  
      if (player) {
        Profile.findById(req.user.profile._id)
          .then(userProfile => {
            userProfile.playerList.push(player._id)
            userProfile.save()
          })
      } else {
        // if the player doesn't exist, create a player with the same id as given through the api
        Player.create(req.body)
          .then(player => {
            Profile.findById(req.user.profile._id)
              .then(userProfile => {
                userProfile.playerList.push(player._id)
                userProfile.save()
              })
          })
      }
    })
    .then(() => {
      res.redirect(`/players/${req.params.id}`)
    })
    .catch(e => {
      console.log(e)
    })
}

function removePlayer(req, res) {
  // find user by req.user.profile._id
  Profile.findById(req.user.profile._id)
  .then(userProfile => {
    // find player by id
    Player.findOne({ apiId: req.body.apiId })
    .then(player => {
      // remove player id from user playerList
      console.log(player)
      userProfile.playerList.remove(player._id)
      userProfile.save()
    })
    .then(() => {
      res.redirect(`/players/${req.params.id}`)
    })
  })
  .catch(e => {
    console.log(e)
  })
}


export {
  search,
  show,
  addPlayer,
  removePlayer
}