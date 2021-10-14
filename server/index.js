import http from 'http';
import { API } from '../main/axios.js';


let axios = new API();

let server = http.createServer(function(req, res) {   // 2 - creating server
     if (req.url == '/data') { //check the URL of the current request

        res.writeHead(200, { 'Content-Type': 'application/json' });
        return axios.requestData('netflix','movies','1').then(response => {
          res.write(JSON.stringify({ message: response}));  
          res.end();  
        });

 }
});
server.listen(5000); //3 - listen for any incoming requests

console.log('Node.js web server at port 5000 is running..')