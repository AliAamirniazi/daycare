const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');
const auth = require('../../middleware/auth');

const User = require('../../models/User');
const Parent = require('../../models/Parent');
const Children = require('../../models/Children');
router.post(
    '/',
    auth,
    check('name', 'Name is required').notEmpty(),
    check('name', 'Name is required').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
        'password',
        'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
    check('role', 'Role is required').notEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password, role } = req.body;

        try {

            if (role === 'Parent') {
                let parent = await Parent.findOne({ email });
                let user = await User.findOne({ email });
                if (user || parent) {
                    return res.json({ error: 'User with this email already exists' });
                }

                parent = new Parent({
                    name,
                    email,
                    password,
                });

                const salt = await bcrypt.genSalt(10);

                parent.password = await bcrypt.hash(password, salt);
                await parent.save();
                res.json({ message: "user is regestered" });
            } else {
                let parent = await Parent.findOne({ email });
                let user = await User.findOne({ email });
                if (user || parent) {
                    return res.json({ error: 'User with this email already exists' });
                }

                user = new User({
                    name,
                    email,
                    password,
                    role
                });

                const salt = await bcrypt.genSalt(10);

                user.password = await bcrypt.hash(password, salt);
                await user.save();
                res.json({ message: "user is regestered" });
            }
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);
router.get('/all_users', auth, async (req, res) => {
    const { search } = req.query;
    let allUser = []
    try {
        const user = await User.aggregate(
            [
                {
                    $match: { $or: [{ email: search }, { name: { $regex: '.*' + search + '.*' } }] }
                }
            ]

        )
        for (const elemt of user) {
            allUser.push(elemt)
        }
        const parent = await Parent.aggregate(
            [
                {
                    $match: { $or: [{ email: search }, { name: { $regex: '.*' + search + '.*' } }] }
                }
            ]

        )
        for (const elemt of parent) {
            allUser.push(elemt)
        }
        const countParent = await Parent.countDocuments(search ? { $or: [{ email: search }, { name: { $regex: '.*' + search + '.*' } }] } : null);
        const countUser = await User.countDocuments(search ? { $or: [{ email: search }, { name: { $regex: '.*' + search + '.*' } }] } : null);

        res.json({ user: allUser, count: countParent + countUser });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/allTeacher', auth, async (req, res) => {
    try {
        const teacher = await User.find({ role: "Teacher" });
        res.json(teacher);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/allParent', auth, async (req, res) => {
    try {
        const teacher = await Parent.find();
        res.json(teacher);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;