const chalk = require('chalk')
const { parse, argv } = require('yargs')
const yargs = require('yargs')
const { listNote } = require('./notes')
const notes = require('./notes')



//Create a command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: "string"
        },
        body: {
            describe: "Note body",
            demandOption: true,
            type: "String"
        },
    },
    handler(argv) {
        notes.addNotes(argv.title,argv.body)
    }
})


//Create a remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: "Note to be removed",
            demandOption: true,
            type: "String"
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})


//Crete a list command 
yargs.command({
    command: 'list',
    describe: 'List a note',
    handler(argv) {
        notes.listNote() 
    }
})

//Create a read command
yargs.command({
    command: 'read',
    describe: 'Read a command',
    builder: {
        title: {
            describe: 'Read a note',
            type: 'string',
            demandOption: true
        }
    },
    handler(argv){
        notes.readNote(argv.title)
    }
})

yargs.parse()