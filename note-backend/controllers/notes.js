const notesRouter = require('express').Router();
const Note = require('../models/note');

notesRouter.get('/', async (req, res) => {
    const notes = await Note.find({});
    res.json(notes);
});

notesRouter.get('/:id', async (req, res) => {
    const note = await Note.findById(req.params.id);
    if (note) {
        res.json(note);
    } else {
        res.status(404).end();
    }
});

notesRouter.post('/', async (req, res) => {
    const body = req.body;
    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
    });
    const savedNote = await note.save();
    res.json(savedNote);
});

notesRouter.delete('/:id', async (req, res) => {
    await Note.findByIdAndRemove(req.params.id);
    res.status(204).end();
});

notesRouter.put('/:id', async (req, res) => {
    const { content, important } = req.body;
    const { id } = req.params;

    const note = {
        content,
        important,
    };

    const updatedNote = await Note.findByIdAndUpdate(id, note, {
        new: true,
    });
    res.json(updatedNote);
});

module.exports = notesRouter;
