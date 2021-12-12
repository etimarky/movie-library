import sqlite3 from 'sqlite3';
const sqlite = sqlite3.verbose();

class Database {

    // returns every movie that is present in the database we connected to
    getMovies() {
        let db = new sqlite.Database('C:/Users/etima/Downloads/movie-database.db')// could potentially change the long sequence to __dirname

        let sql = 'SELECT * from movie';
        return new Promise((res, rej) => {
            return db.all(sql, [], (err, rows) => {
                if (err) {
                    console.log(err)
                }
                return res(rows);
            })
        })

    }
    // searches the DB for a particular movie title for the selected object of wish list
    async getMovie(title) {
        let db = new sqlite.Database('C:/Users/etima/Downloads/movie-database.db')// could potentially change the long sequence to __dirname

        let sql = 'SELECT * from selected WHERE title = ?';

        return new Promise((res, rej) => {

            return db.all(sql, [title], (err, rows) => {
                return res(rows);
            })

        })

    }
    async removeSelected(movie) {
        let db = new sqlite.Database('C:/Users/etima/Downloads/movie-database.db')// could potentially change the long sequence to __dirname

        let sql = 'DELETE from selected WHERE title = ?';

        return new Promise((res, rej) => {
            return db.all(sql, [movie.title], (err, rows) => {
                if (err) {
                    console.log(err)
                }
            })
        })
    }
    async updateSelected(movie) {
        let db = new sqlite.Database('C:/Users/etima/Downloads/movie-database.db')// could potentially change the long sequence to __dirname
        let m = await this.getMovie(movie.movie.title)
    
        if (m.length === 0) {

            let sql = "INSERT INTO selected(title,imdbID) VALUES (?,?)";
            let params = [movie.movie.title, movie.movie.imdbID];

            return new Promise((res, rej) => {
                return db.all(sql, params, (err, rows) => {
                    if (err) {
                        console.log(err)
                    }
                })
            })

        }
        else {
            return await this.removeSelected(m[0]);
        }


    }
}
export { Database }