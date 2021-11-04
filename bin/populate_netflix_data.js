import { API } from '../main/axios.js';
import sqlite3 from 'sqlite3';

const axios = new API();
const sqlite = sqlite3.verbose();
const DBSOURCE = "db.sqlite"

//Opens a database in memory
let db = new sqlite.Database('C:\Users\etima\Downloads\movie-database.db', (error) => {// could potentially change the long sequence to __dirname
    if (error) {
        return console.log(error.message);
    }
    console.log('Connection Successful');
});

async function getPages() {
    const response = await axios.searchNetflix();
    const totalPages = response.total_pages;
    return totalPages;
}

async function populateNetflixData(totalPages) {
    let count = 1;
    while (count <= 1) {
        let response = await axios.searchNetflix();
        let results = response.results;

        for (let i = 0; i < results.length; i++) {
            console.log(JSON.stringify(results[i]));
            let m = results[i];
            let sql = "INSERT INTO movie(imdbID,tmdbID,imdbRating,imdbVoteCount,tmdbRating,backdropPath,backdropURLs, originalTitle,genres,countries,year,runtime,cast,significants,title,overview,tagline,video,posterPath,posterURLs,age,streamingInfo,originalLanguage) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
            let params = [m.imdbID, m.imdbID, m.tmdbID, m.imdbRating ,m.imdbVoteCount ,m.tmdbRating, m.backdropPath, m.backdropURLs, m.originalTitle, m.genres, m.countries, m.year, m.runtime ,m.cast, m.significants, m.title, m.overview, m.tagline,m.video,m.posterPath,m.posterURLs,m.age,m.streamingInfo,m.originalLanguage];
            db.all(sql,params,(err,rows) => {
                if (err){
                    console.log(err)
                }
                console.log('inserted', rows)
            })
            // db.run(`INSERT INTO [movie-library](
            //     imdbID,
            //     tmdbID,
            //     imdbRating,
            //     imdbVoteCount,
            //     tmdbRating,
            //     backdropPath,
            //     backdropURLs,
            //     originalTitle,
            //     genres,
            //     countries,
            //     year,
            //     runtime,
            //     cast,
            //     significants,
            //     title,
            //     overview,
            //     tagline,
            //     video,
            //     posterPath,
            //     posterURLs,
            //     age,
            //     streamingInfo,
            //     originalLanguage) 
            //    VALUES('${m.imdbID}', '${m.tmdbID}', ${m.imdbRating} ,${m.imdbVoteCount} ,${m.tmdbRating}, '${m.backdropPath}', '${m.backdropURLs}', '${m.originalTitle}', '${m.genres}', '${m.countries}', ${m.year}, ${m.runtime} ,'${m.cast}', '${m.significants}' , '${m.title}', '${m.overview}', '${m.tagline}','${m.video}','${m.posterPath}','${m.posterURLs}',${m.age},'${m.streamingInfo}','${m.originalLanguage}')`)
        
        }
        count += 1;
    }
}

export { getPages, populateNetflixData }