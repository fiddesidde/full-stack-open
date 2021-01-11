const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log(
        'Please provide the password as an argument: node mongo.js <password>'
    );
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://first-user:${password}@cluster0.ho4n1.mongodb.net/note-app?retryWrites=true&w=majority`;

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
});

const Note = mongoose.model('Note', noteSchema);

// const note = new Note({
//     content: 'First day of work',
//     date: new Date(),
//     important: false,
// });

// note.save().then(res => {
//     console.log('note saved!');
//     mongoose.connection.close();
// });

// Note.find({}).then(result => {
//     result.forEach(note => {
//         console.log(note);
//     });
//     mongoose.connection.close();
// });

const logNotes = async () => {
    const notes = await Note.find({});
    console.log(notes);
    mongoose.connection.close();
};

logNotes();
