const notesRouter = require('express').Router();
const Note = require('../models/note');

notesRouter.get('/', async (req, res) => {
    const notes = await Note.find({});
    res.json(notes);
});

notesRouter.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const note = await Note.findById(id);
        if (note) {
            res.json(note);
        } else {
            res.status(404).end();
        }
    } catch (error) {
        next(error);
    }
});

notesRouter.post('/', async (req, res, next) => {
    const body = req.body;
    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
    });
    try {
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        next(error);
    }
});

notesRouter.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        await Note.findByIdAndRemove(id);
        res.status(204).end();
    } catch (error) {
        next(error);
    }
});

notesRouter.put('/:id', async (req, res, next) => {
    try {
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
    } catch (error) {
        next(error);
    }
});

module.exports = notesRouter;
