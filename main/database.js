import sqlite3 from 'sqlite3';
const sqlite = sqlite3.verbose();

class Database {

     getMovies(){
        let db = new sqlite.Database('C:/Users/etima/Downloads/movie-database.db')// could potentially change the long sequence to __dirname

        let sql = 'SELECT * from movie';
        return new Promise((res,rej) => {
            return db.all(sql,[],(err,rows) => {
                if (err){
                    console.log(err)
                }
                return res(rows);
            })
        })
       
    }
}
export { Database }