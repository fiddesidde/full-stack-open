if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const cors = require('cors');
const Note = require('./models/note');

const requestLogger = (req, res, next) => {
    console.log('Method:', req.method);
    console.log('Path:  ', req.path);
    console.log('Body:  ', req.body);
    console.log('---');
    next();
};

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' });
};

app.use(express.json());
app.use(requestLogger);
app.use(cors());
app.use(express.static('build'));

app.get('/api/notes', async (req, res) => {
    const notes = await Note.find({});
    res.json(notes);
});

app.get('/api/notes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findById(id);
        if (note) {
            res.json(note);
        } else {
            res.status(404).end();
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({ error: 'malformatted id' });
    }
});

app.delete('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id);
    notes = notes.filter(note => note.id !== id);
    res.status(204).end();
});

app.post('/api/notes', async (req, res) => {
    const body = req.body;
    if (body.content === undefined) {
        return res.status(400).json({ error: 'content missing' });
    }
    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
    });
    await note.save();
    res.json(note);
});

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
