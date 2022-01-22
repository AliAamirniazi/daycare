const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');
const auth = require('../../middleware/auth');

const Children = require('../../models/Children');
router.post(
    '/',
    auth,
    check('fullName', 'Full name is required').notEmpty(),
    check('age', 'Age is required').notEmpty(),
    check('gender', 'Gender is required').notEmpty(),
    check('user', 'Role is required').notEmpty(),
    check('parent', 'Role is required').notEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullName, age, gender, user, parent } = req.body;

        try {
           let children = new Children({
                fullName,
                age,
                gender,
                user,
                parent
            });
            await children.save();

            res.json("Children are Added");


        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);
router.get('/', auth, async (req, res) => {
    try {
      const children = await Children.find().populate('user').populate('parent').sort({ date: -1 });
      res.json(children);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  
  router.get('/:id', auth, async (req, res) => {
    try {
      const children = await Children.findById(req.params.id);
  
      if (!children) {
        return res.status(404).json({ msg: 'children not found' });
      }
  
      res.json(children);
    } catch (err) {
      console.error(err.message);
  
      res.status(500).send('Server Error');
    }
  });
module.exports = router;