/**
 * Express server class that uses express and creates a simple server to display the data being fetched
 */

import { API } from '../main/axios.js';
import express from 'express'
import cors from 'cors';
import { Database } from '../main/database.js';

const db = new Database();
const axios = new API();
// create new express app and save it as a constant
const app = express();
app.use(cors());
// server configuration
const PORT = 8081;

app.get('/movies', cors(), (req,res) => {
  return db.getMovies().then(response => {
    res.send(JSON.stringify({ message: response }));

  })
})


app.get('/', cors(), (req, res) => {

  return axios.searchNetflix().then(response => {
    res.send(JSON.stringify({ message: response }));

  })
})
// port is listening to requests
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`)
})
