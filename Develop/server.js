const express = require('express');
const fs = require('fs');

const PORT = 3001;
const path = require ('path');
const database = require('./db/db.json');
const uuid = require('./helpers/uuid.js');
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'));

app.get('/index' , (req, res) => res.sendFile(path.join(__dirname, '/public/')));
app.get('/notes' , (req, res) => res.sendFile(path.join(__dirname, '/public/')));

app.get('/api/notes', (req,res) => { 
    
    console.info(`${req.method} request received`)

}); 


app.post('./api/notes', (req,res) => {

    console.info(`${res.method} reponse received`)
});

app.post('/api/notes', (req ,res) => {
    console.info(`${req.method} recieved. Adding a NOTE to the db`);
    const {title , text } = req.body;

    if(title && text) {
        const newNote = {
            title,
            text,
        };
    


    fs.readFile(`./db/db.json`, 'utf8', (err, data) => {
        if(err){
            console.error(err);
        } else {
            const parsedNotes = JSON.parse(data);
            parsedNotes.push(newNote);
            fs.writeFile('./db/db.json' , 
            JSON.stringify(parsedNotes, 4),
            (writeErr) =>
                writeErr
                    ? console.error(writeErr)
                    : console.info('Succesfully updated dB')
            );
        }
    
    });

    const respone = {
        status: 'success',
        body:newNote,
    };

    console.log(response);
    res.json(response);
}else{
    res.json("error");
}
});




app.listen(PORT, () =>
console.log(`STATIC SERVER AT ${PORT}`) );

module.exports = app; 
/*const http = require('http');
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
*/