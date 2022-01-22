const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const moment = require('moment');
const Attendance = require('../../models/Attendance');
const Children = require('../../models/Children');

router.post(
    '/generate',
    auth,
    check('user', 'children id is required').notEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { user } = req.body;
        const date = moment().format('YYYY-MM-DD');
        try {
            const children = await Children.find({ user });
            for (const elemt of children) {
                let attendanceExist = await Attendance.findOne({ date, children: elemt._id });
                if (!attendanceExist) {
                    let attendance = new Attendance({
                        children: elemt._id,
                        date: date
                    });
                    await attendance.save();
                }
            }
            res.json("Attendance is Generated");
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });
router.post(
    '/updateAttendace',
    auth,
    check('children', 'children is required').notEmpty(),
    check('date', 'date is required').notEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { checkIn, checkOut, children, date } = req.body;
        Attendance.findOneAndUpdate({ children, date }, { checkIn, checkOut }, { upsert: false }, function (err, doc) {
            if (err) return res.send(500, { error: err });
            return res.send('Succesfully updated.');
        });
    }
);
router.get(
    '/allAttendance', auth, async (req, res) => {
        try {
            const attendance = await Attendance.find().sort({ date: -1 });
            res.json(attendance);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);
module.exports = router;