const fs = require('fs')
const chalk = require('chalk')

const addNotes = (title,body) => {
    const notes = loadNotes()
    const duplicateNotes = notes.find(note => note.title === title)

    if(!duplicateNotes){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('New notes added')
    } else {
        console.log('Note already preset')
    }  
}



const saveNotes = notes => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}



const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }catch(e) {
        return []
    }
}



const removeNote = title => {
    const notes = loadNotes()
    const notesToKeep = notes.filter( note => note.title !== title )
    if (notes.length === notesToKeep.length){
        console.log(chalk.red.inverse("No matching note found"))
    } else {
        saveNotes(notesToKeep)
        console.log(chalk.green.inverse("Note successfully removed!"))
    }
}

const listNote = () => {
    console.log(chalk.inverse.red('Your notes are: \n'))
    const notes = loadNotes()
    notes.forEach(element => {
        console.log(chalk.white(element.title,element.body))
    });
}
    

const readNote = title => {
    const notes = loadNotes()
    const findNote = notes.find(note => note.title === title)
    if(findNote){
        console.log(chalk.blue.inverse('Note found!'))
        console.log(chalk.red(findNote.title))
        console.log(chalk.white(findNote.body))
    } else {
        console.log(chalk.red.inverse('Note not found!'))
}
}

module.exports = {
    addNotes: addNotes,
    removeNote: removeNote,
    listNote: listNote,
    readNote: readNote
}