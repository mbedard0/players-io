import { Player } from "../models/player.js";
import axios from "axios";

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
      console.log(response.data)
    })
    .catch(e => {
      console.log(e)
    })
}


export {
  search
}