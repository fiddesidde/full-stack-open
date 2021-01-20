const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

usersRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs', {
        title: 1,
        author: 1,
        url: 1,
        likes: 1,
    });
    res.json(users);
});

usersRouter.post('/', async (req, res, next) => {
    const { username, name, password } = req.body;
    if (!password) {
        return res.status(400).json({ error: 'password missing' });
    } else if (password.length < 3) {
        return res
            .status(400)
            .json({ error: 'password needs to be atleast 3 characters long' });
    }

    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
        username,
        name,
        passwordHash,
    });
    try {
        const savedUser = await user.save();
        res.json(savedUser);
    } catch (error) {
        next(error);
    }
});

module.exports = usersRouter;
