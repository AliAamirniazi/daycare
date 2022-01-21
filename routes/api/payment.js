const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');
const auth = require('../../middleware/auth');

const Payment = require('../../models/Payment');
router.post(
    '/',
    auth,
    check('user', 'user is required').notEmpty(),
    check('month', 'Month is required').notEmpty(),
    check('year', 'Year is required').notEmpty(),
    check('amount', 'Amount is required').notEmpty(),
    check('status', 'Status is required').notEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { user, month, year, amount,status } = req.body;

        try {
           let payment = new Payment({
                user,
                month,
                year,
                amount,
                status
            });
            await payment.save();

            res.json("Payment is Added");


        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);
router.get('/', auth, async (req, res) => {
    try {
      const payment = await Payment.find().populate('user').sort({ date: -1 });
      res.json(payment);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  
  router.get('/:id', auth, async (req, res) => {
    try {
      const payment = await Payment.findById(req.params.id);
  
      if (!payment) {
        return res.status(404).json({ msg: 'payment not found' });
      }
  
      res.json(payment);
    } catch (err) {
      console.error(err.message);
  
      res.status(500).send('Server Error');
    }
  });
module.exports = router;