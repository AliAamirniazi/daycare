const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const moment = require('moment');
const DailyActivity = require('../../models/DailyActivity');
const Children = require('../../models/Children');

router.get(
    '/insert',
    auth,
    check('user', 'teacher id is required').notEmpty(),
    check('activity', 'Name is required').notEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { user, activity } = req.body;
        const date = moment().format('YYYY-MM-DD');
        try {
            let activiytExist = await DailyActivity.find({ date, user });
            if (activiytExist.length > 0) {
                res.json("Activity for this date exists");
            } else {
                let Activity = new DailyActivity({
                    user: user,
                    activity: activity,
                });
                await Activity.save();
                res.json("Activities added");
            }
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });
module.exports = router;