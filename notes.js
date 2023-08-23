const fs = require("fs");
const chalk = require("chalk");
const { title } = require("process");

const getNotes = () => {
  return "Your notes...";
};


const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note)=> note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    savedNotes(notes);
    console.log(chalk.green.inverse("New note added"));
  } else {
    console.log(chalk.red.inverse("Note title taken"));
  }
};


const savedNotes = (notes)=>{
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};


const loadNotes =  () =>{
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};


const removeNote =  (title)=> {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note)=> note.title !== title);


  if (notesToKeep.length < notes.length) {
    console.log(chalk.green.inverse("Note removed!!!"));
    savedNotes(notesToKeep);
  } else {
    console.log(chalk.red.inverse("No note removed!!!"));
  }
};


const listNotes = ()=>{
  const notes = loadNotes();
  console.log(chalk.inverse('Your Notes'));
  notes.forEach((note)=>{
    console.log(note.title);
  })
};

const readNote =(title)=>{
  const notes = loadNotes();
  const noteToRead = notes.find((note)=> note.title === title);

  if(noteToRead){
    console.log(chalk.bold.italic(noteToRead.title));
    console.log(noteToRead.body);
  } else{
    console.log(chalk.red.inverse("No note found"));
  }

};


module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes:listNotes,
  readNote:readNote
};
