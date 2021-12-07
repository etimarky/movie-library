import { API } from '../main/axios.js';
import sqlite3 from 'sqlite3';

const axios = new API();
const sqlite = sqlite3.verbose();

//Opens a database in memory
let db = new sqlite.Database('C:/Users/etima/Downloads/movie-database.db', (error) => {// could potentially change the long sequence to __dirname
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
function getGenreName(movie) {
    // console.dir(movie.genres);
    let genre = ''
    if (movie.genres !== null) {
        if (movie.genres.includes(1)) {
            genre += ' Biography ';
        }
        if (movie.genres.includes(2)) {
            genre += ' Film Noir '
        }
        if (movie.genres.includes(3)) {
            genre += ' Game Show '
        }
        if (movie.genres.includes(4)) {
            genre += ' Musical '
        }
        if (movie.genres.includes(5)) {
            genre += ' Sport '
        }
        if (movie.genres.includes(6)) {
            genre += ' Short '
        }
        if (movie.genres.includes(7)) {
            genre += ' Adult '
        }
        if (movie.genres.includes(12)) {
            genre += ' Adventure '
        }
        if (movie.genres.includes(14)) {
            genre += ' Fantasy '
        }
        if (movie.genres.includes(16)) {
            genre += ' Animation '
        }
        if (movie.genres.includes(18)) {
            genre += ' Drama '
        }
        if (movie.genres.includes(27)) {
            genre += ' Horror '
        }
        if (movie.genres.includes(28)) {
            genre += ' Action '
        }
        if (movie.genres.includes(35)) {
            genre += ' Comedy '
        }
        if (movie.genres.includes(36)) {
            genre += ' History '
        }
        if (movie.genres.includes(37)) {
            genre += ' Western '
        }
        if (movie.genres.includes(53)) {
            genre += ' Thriller '
        }
        if (movie.genres.includes(80)) {
            genre += ' Crime '
        }
        if (movie.genres.includes(99)) {
            genre += ' Documentary '
        }
        if (movie.genres.includes(878)) {
            genre += ' Science Fiction '
        }
        if (movie.genres.includes(9648)) {
            genre += ' Mystery '
        }
        if (movie.genres.includes(10402)) {
           genre += ' Music '
        }
        if (movie.genres.includes(10749)) {
            genre += ' Romance '
        }
        if (movie.genres.includes(10751)) {
            genre += ' Family '
        }
        if (movie.genres.includes(10752)) {
            genre += ' War '
        }
        if (movie.genres.includes(10763)) {
            genre += ' News '
        }
        if (movie.genres.includes(10764)) {
            genre += ' Reality '
        }
        if (movie.genres.includes(10767)) {
            genre += ' Talk Show'
        }
    }
    
    if (genre !== ''){
        genre = genre.replaceAll('  ', '/')
    }
    return genre;
}

function getStreamingInfo(movie) {
    if (movie.streamingInfo !== null) {
        let info = JSON.stringify(movie.streamingInfo);
        return info;
    }
}

async function populateNetflixData(totalPages) {
    let count = 353;
    while (count <= totalPages) {
        let response;
        try {
            response = await axios.searchNetflix(count.toString());
        } catch (err) {
            console.log('Failed on page: ' + count);
            throw err;
        }
        let results = response.results;
        // start at 353
        console.log(count);
        for (let i = 0; i < results.length; i++) {
            // console.log(JSON.stringify(results[i]));
            let m = results[i];
            let sql = "INSERT INTO movie(imdbID,tmdbID,imdbRating,imdbVoteCount,tmdbRating,backdropPath,backdropURLs, originalTitle,genres,countries,year,runtime,cast,significants,title,overview,tagline,video,posterPath,posterURLs,age,streamingInfo,originalLanguage) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
            let genre = getGenreName(m);
            let streamingInfo = getStreamingInfo(m);
            let params = [m.imdbID, m.tmdbID, m.imdbRating, m.imdbVoteCount, m.tmdbRating, m.backdropPath, m.backdropURLs, m.originalTitle, genre, m.countries, m.year, m.runtime, m.cast, m.significants, m.title, m.overview, m.tagline, m.video, m.posterPath, m.posterURLs, m.age, streamingInfo, m.originalLanguage];

            db.all(sql, params, (err, rows) => {
                if (err) {
                    console.log(err)
                }
            })

        }

        count += 1;
    }
}

export { getPages, populateNetflixData }