const http = require('http');
const fs = require('fs');

const PORT = 8080;

const handleRequest = (req, res) => {

    const path =req.url;
    switch(path) {
        case '/Develop/public/index' :
            return fs.readFile(`${__dirname}/Develop/public/index.html`, (err, data) => {
                if(err) throw err;
        
            res.writeHead(200, { 'Content-Type': 'text/html'});
            res.end(data);       
    });
        case '/Develop/public/notes' :
            return fs.readFile(`${__dirname}/Develop/public/notes.html`, (err, data) => {
                if(err) throw err;
        
            res.writeHead(200, { 'Content-Type': 'text/html'});
            res.end(data); 
            });   

        default:
            return fs.readFile(`${__dirname}/Develop/public/index.html`, (err, data) => {
                if(err) throw err;
        
            res.writeHead(200, { 'Content-Type': 'text/html'});
            res.end(data);   
            });

}
};


const server = http.createServer(handleRequest);

server.listen(PORT, () => {
    console.log(`Server is active: Listening to ${PORT}`);
});