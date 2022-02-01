const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');
const auth = require('../../middleware/auth');
const moment = require('moment');
const Payment = require('../../models/Payment');
const Children = require('../../models/Children');

router.post(
  '/add',
  auth,
  check('parent', 'parent id is required').notEmpty(),
  check('month', 'Month is required').notEmpty(),
  // check('year', 'Year is required').notEmpty(),
  check('amount', 'Amount is required').notEmpty(),
  check('status', 'Status is required').notEmpty(),
  check('children', 'Status is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { parent, month, year, amount, children, status } = req.body;
    Payment.findOneAndUpdate({ children, parent, month }, { amount, status }, { upsert: false }, function (err, doc) {
      if (err) return res.send(500, { error: err });
      return res.send('Succesfully saved.');
    });
  }
);
router.get('/payment', auth, async (req, res) => {
  const { search } = req.query;
  const month = moment(JSON.parse(search).date).format('MMMM');
  const year = moment(JSON.parse(search).date).format('YYYY');
  const status = JSON.parse(search).status;
  try {
    const payment = await Payment.find(search ? { $and: [{ month: month }, { year: year }, { status: status === 'All' ? ['Paid', 'Unpaid'] : status }] } : null).populate('children').sort({ date: -1 });
    const count = await Payment.countDocuments(search ? { $and: [{ month: month }, { year: year }, { status: status === 'All' ? ['Paid', 'Unpaid'] : status }] } : null);
    res.json({ payment: payment, count: count });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/payment/:id', auth, async (req, res) => {
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
router.post('/generatePayment', auth, async (req, res) => {
  const { month, year } = req.body;
  try {
    const children = await Children.find();
    for (const elemt of children) {
      let payementExist = await Payment.findOne({ month: month, year: year, children: elemt._id });
      if (!payementExist) {
        let payment = new Payment({
          parent: elemt.parent,
          children: elemt._id,
          month: month,
          year: year,
          amount: null,
          status: "Initiated"
        });
        await payment.save();
      }
    }
    const payment = await Payment.find({ status: 'Initiated' }).populate('children');
    const count = await Payment.countDocuments({ status: 'Initiated' });
    res.json({ payment: payment, count: count });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
router.post('/createPayment', auth, async (req, res) => {
  const { month, year, children, amount } = req.body;
  try {
    for (const elemt of children) {
      let payementExist = await Payment.findOne({ month: month, year: year, children: elemt });
      if (payementExist) {
       const ali=  await Payment.findOneAndUpdate({ children: elemt, month: month, year: year }, { status: 'Unpaid' }, {
        new: true
      });
       console.log('month', month,'year',year,elemt);

      }
    }
    res.json({ message: 'Payments Generated' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;