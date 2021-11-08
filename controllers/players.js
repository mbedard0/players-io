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
        title: `Search page`,
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
        userHasPlayer: response.data.player?.playerList.some(profile => profile._id.equals(req.user.profile._id))
      })
    })
    .catch(e => {
      console.log(e)
    })
}

function add(req, res) {
  console.log(req.body.apiId)
  // find the player by the id which is: req.body.apiId
  Player.findOne({playerId: req.body.apiId}) 
  .then(player => {
    if (player) { // not currently hitting this branch at all
      // if it does exist, then use the existing player id to push to the profile playerlist
      Profile.findById(req.user.profile._id, function(error, userProfile) {
        userProfile.playerList.push(req.body.apiId) //having issues with this line
        userProfile.playerList.save() 
      })
      .catch(e => {
        console.log(e)
      })
    } else {
      // if the player doesn't exist, create a player with the same id as given through the api
      Player.create(req.body) // successfully saves player, but needs to have more info
      .then(player => {
        Profile.findById(req.user.profile._id, function(error, userProfile) {
          userProfile.playerList.push(player)
          userProfile.playerList.save()
        })
      })
        .then(() => {
        res.redirect(`/players/${req.params.id}`)
      })
      .catch(e => {
        console.log(e)
      })
    }
  // console.log(req.user.profile._id)
})
}


function remove(req, res) {
  
}


export {
  search,
  show,
  add,
  // remove
}