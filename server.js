const express = require('express');
const fs = require('fs');

const PORT = 3001;
const path = require('path');

const uuid = require('./helpers/uuid.js');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/index', (req, res) => res.sendFile(path.join(__dirname, '/public/')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/')));

app.get('/api/notes.html', (req, res) => {
    
    const readNotes = fs.readFileSync('./db/db.json');
    const conversionNotes = JSON.parse(readNotes);
    console.log("This is the output from app.get");
    console.log(conversionNotes);
    
    res.json(conversionNotes);

    if (req.method = "GET") {
        console.log("you have recieved a get repsonse")
        
    }
});


app.post('/api/notes.html', (req, res) => {

    console.info(`${req.method} request received, adding notes to DB`);
    console.info("The following line shows the req.body");
    let NewNote;
    // There are 3 properties inside the db.json file
    const { title, text } = req.body;
    // This checks to see if properties exist
    if (title && text) {
        NewNote = {
            title,
            text,
            note_id: uuid(),
        };
        // DB constructor
        

        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const parsedNotes = JSON.parse(data);
                console.log("parsedNotes output");
                parsedNotes.push(NewNote);
                console.log(parsedNotes);
                
                fs.writeFile('./db/db.json', JSON.stringify(parsedNotes), (writeErr) =>
                    writeErr
                        ? console.error(writeErr)
                        : console.info('Appended the DB')
                );

            
            }
        });
    }

    res.json(NewNote);
   

});





app.listen(PORT, () =>
    console.log(`STATIC SERVER AT ${PORT}`));

module.exports = app;
