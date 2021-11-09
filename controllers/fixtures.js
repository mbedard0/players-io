import { Fixture } from "../models/fixture.js";
import axios from "axios";

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
      console.log(response.data.response)
      res.render('fixtures/show', {
        title: `Fixture Details`,
        results: response.data.response,
      })
    })
    .catch(e => {
      console.log(e)
    })
}

export {
  index,
  show
}