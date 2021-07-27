
let noteTitle;
let noteText;
let saveNoteBtn;
let newNoteBtn;
let noteList;
let noteresponse = [];
let conditionalDisplay;
let conditionalDisplay2;
let jsonNotes;
let textValue;
let dataNoteDisplay;
let v;
let noteListName = [];
let noteListText = [];
let noteListID = [];

if (window.location.pathname === '/notes.html') {
  noteTitle = document.querySelector('.note-title');
  noteText = document.querySelector('.note-textarea');
  saveNoteBtn = document.querySelector('.save-note');
  newNoteBtn = document.querySelector('.new-note');
  noteList = document.querySelectorAll('.list-container .list-group');
  conditionalDisplay = document.querySelectorAll('list-item-title');

  conditionalDisplay2 = document.querySelectorAll('list-group-item');
  dataNoteDisplay = document.querySelectorAll('data-note');
}


// Show an element
const show = (elem) => {
  elem.style.display = 'inline';
};

// Hide an element
const hide = (elem) => {
  elem.style.display = 'none';
};

// activeNote is used to keep track of the note in the textarea
let activeNote = {};


const getNotes = () =>

  fetch('/api/notes.html', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });




const saveNote = (note) =>

  fetch('/api/notes.html', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),

    //DEVIATION FROM STANDARD CODE
  })
    .then((response) => {
      console.log("Savenote was initiated, the following is from SaveNote");
      console.log(note);
      if (response.ok) {
        return response.json();
      } else {
        alert(`Error: ${response.statusText}`);
      }


    });

const deleteNote = (id) =>
  fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

const renderActiveNote = () => {
  console.log("renderActiveNote was initiated");
  console.log(jsonNotes);
  hide(saveNoteBtn);

  if (jsonNotes[0].node_id = "") {
    console.log("renderActivenotes has detected that there is note_id");
    noteTitle.setAttribute('readonly', true);
    noteText.setAttribute('readonly', true);
    noteTitle.value = jsonNotes[2].title;
    noteText.value = jsonNotes[2].text;
  } else {
    noteTitle.removeAttribute('readonly');
    noteText.removeAttribute('readonly');
    noteTitle.value = '';
    noteText.value = '';
  }
};

const handleNoteSave = () => {
  console.log("The Save button was clicked");
  const newNote = {
    title: noteTitle.value,
    text: noteText.value,
  };
  saveNote(newNote).then(() => {
    console.log("This is the output of handleNoteSave, after saveNote is finished");
    console.log(newNote);
    noteresponse = newNote;
    getAndRenderNotes(newNote);
    renderActiveNote(newNote);
  });
};

// Delete the clicked note
const handleNoteDelete = (e) => {
  // Prevents the click listener for the list from being called when the button inside of it is clicked
  e.stopPropagation();

  const note = e.target;
  const noteId = JSON.parse(note.parentElement.getAttribute('data-note')).id;

  if (activeNote.id === noteId) {
    activeNote = {};
  }

  deleteNote(noteId).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Sets the activeNote and displays it
const handleNoteView = (e) => {
  e.preventDefault();
  activeNote = JSON.parse(e.target.parentElement.getAttribute('data-note'));
  renderActiveNote(activeNote);
};

// Sets the activeNote to and empty object and allows the user to enter a new note
const handleNewNoteView = (e) => {
  console.log("New Note View was clicked");
  activeNote = {};
  renderActiveNote();
};

const handleNoteView2 = () => {
console.log("yes");
  let noteListName = [];
  let noteListText = [];
  let noteListID = [];

  for (let i = 0; i < jsonNotes.length; i++) {
    let instance = document.querySelectorAll('list-item-title', i).innerHTML;
    console.log(JSON.stringify(instance));
  }

  hide(saveNoteBtn);
  noteTitle.value = jsonNotes[v].title;
  noteText.value = jsonNotes[v].text;


};




const handleRenderSaveBtn = () => {
  if (!noteTitle.value.trim() || !noteText.value.trim()) {
    hide(saveNoteBtn);
  } else {
    show(saveNoteBtn);
  }
};

// Render the list of note titles

const renderNoteList = async (notes) => {
  jsonNotes = await notes.json();
  console.log("renderNoteList was intiated");



  if (window.location.pathname === '/notes.html') {
    noteList.forEach((el) => (el.innerHTML = ''));
  }

  let noteListItems = [];

  //  Returns HTML element with or without a delete button
  const createLi = (text, i,  delBtn = true) => {
    const liEl = document.createElement('li');
    liEl.classList.add('list-group-item');
    const spanEl = document.createElement('span');
    spanEl.classList.add('list-item-title' , i );
    spanEl.innerText = text;
    spanEl.addEventListener('click', handleNoteView2);

    liEl.append(spanEl);

    if (delBtn) {
      const delBtnEl = document.createElement('i');
      delBtnEl.classList.add(
        'fas',
        'fa-trash-alt',
        'float-right',
        'text-danger',
        'delete-note'
      );
      delBtnEl.addEventListener('click', handleNoteDelete);

      liEl.append(delBtnEl);
    }

    return liEl;
  };


  if (jsonNotes.length === 0) {
    noteListItems.push(createLi('No saved Notes', false));
  }


  console.log(jsonNotes);
  activeNote = jsonNotes;
  console.log(jsonNotes.length);


  for (let i = 0; i < jsonNotes.length; i++) {
    const li = createLi(jsonNotes[i].title, i);
    li.dataset.note = JSON.stringify(notes);
    dataNoteDisplay.innerHTML = jsonNotes[i].note_id;
    noteListItems.push(li);
    v = i;
  }

  if (window.location.pathname === '/notes.html') {
    noteListItems.forEach((note) => noteList[0].append(note));
  }

};


// Gets notes from the db and renders them to the sidebar
const getAndRenderNotes = () => getNotes().then(renderNoteList);
const intermediaryProcessing = () => getNotes().then(handleNoteView2);


if (window.location.pathname === '/notes.html') {
  console.log("pathname is read");
  saveNoteBtn.addEventListener('click', handleNoteSave);
  newNoteBtn.addEventListener('click', handleNewNoteView);
  noteTitle.addEventListener('keyup', handleRenderSaveBtn);
  noteText.addEventListener('keyup', handleRenderSaveBtn);
}


console.log("index.js has loaded");
getAndRenderNotes();
