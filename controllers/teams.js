import axios from "axios";

function index(req, res) {
  axios.get(`https://v3.football.api-sports.io/teams`,
    {
      params: { season: 2021, league: 39 },
      headers: {
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-rapidapi-key': process.env.API_KEY
      }
    })
    .then(response => {
      res.render('teams/index', {
        title: `View all teams`,
        results: response.data.response,
      })
    })
    .catch(e => {
      console.log(e)
    })
}

function show(req, res) {
  axios.get(`https://v3.football.api-sports.io/players/squads`,
    {
      params: { team: req.params.id },
      headers: {
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-rapidapi-key': process.env.API_KEY
      }
    })
    .then(response => {
      res.render('teams/show', {

        title: `Team Details`,
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