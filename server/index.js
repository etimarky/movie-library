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


let sql = 'SELECT * FROM movie-library';

//db.all returns all rows
//db.get returns only 1 row
//db.rin() allows you to create,insert,delete test

db.all(sql,[], (err, rows) => {
    if(err) {
        throw err;
    }
    rows.forEach((row) => {
        console.log(row.imdbID + " " + row.tmdbID);
    })
});

// //closes the database
// db.close((error) => {
//     if(error){
//         console.log(error.message);
//     }
//     console.log('Database Closed');
// });
//route created for the app with data

app.get('/', cors(), (req, res) => {

  return axios.searchNetflix().then(response => {
    res.send(JSON.stringify({ message: response }));

  })
})
// port is listening to requests
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`)
})
