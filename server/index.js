/**
 * Express server class that uses express and creates a simple server to display the data being fetched
 */

import { API } from '../main/axios.js';
import express from 'express'
import cors from 'cors';

const axios = new API();
// create new express app and save it as a constant
const app = express();
app.use(cors());
// server configuration
const PORT = 8080;

//route created for the app with data
app.get('/', cors(), (req, res) => {

  return axios.searchDetails('netflix', 'series', '4', 'en').then(response => {
    res.send(JSON.stringify({ message: response }));

  })
})
// port is listening to requests
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`)
})
