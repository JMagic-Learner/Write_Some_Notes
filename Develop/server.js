const { response } = require('express');
const express = require('express');
const fs = require('fs');

const PORT = 3001;
const path = require ('path');
const notes = require('./db/db.json');
const uuid = require('./helpers/uuid.js');
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'));

app.get('/index' , (req, res) => res.sendFile(path.join(__dirname, '/public/')));
app.get('/notes' , (req, res) => res.sendFile(path.join(__dirname, '/public/')));

app.get('/api/notes.html', (req,res) => { 

console.log(notes);
let conversion = JSON.stringify(notes);

res.json(conversion);
});


app.post('/api/notes.html', (req,res) => {

    console.info(`${req.method} request received, adding notes to DB`);
    // There are 3 properties inside the db.json file
    const {title, text} = req.body;
    // This checks to see if properties exist
    if (title && text) {

    // DB constructor
        const NewNote = {
            title,
            text,
            note_id: uuid(),
        };
    
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const parsedNotes = JSON.parse(data);
                parsedNotes.push(NewNote);
                fs.writeFile('./db/db.json' , JSON.stringify(parsedNotes) , (writeErr) =>
                writeErr
                    ? console.error(writeErr)
                    :console.info('Appended the DB')
                );
        }
        });
    

    const response = {
        status: 'success',
        body: NewNote,

    };

    console.log(response);
    res.json(response);
} else {
    res.json("error");

    
}
});


   


app.listen(PORT, () =>
console.log(`STATIC SERVER AT ${PORT}`) );

module.exports = app; 
