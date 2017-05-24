'use strict';

const express = require('express');
const mailer = require('../mailer');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express', messages: req.flash() });
});

router.post('/signup', (req, res, next) => {

  let siteContactOptions = {
    to: process.env.CONTACT,
    from: process.env.FROM,
    subject: `Message from ${req.body.email}`,
    text: req.body.message
  };
  mailer.transporter.sendMail(siteContactOptions, (error, info) => {
    if (error) {
      return res.sendStatus(501);
    }
 
    let leadOptions = {
      to: req.body.email,
      from: process.env.FROM,
      subject: 'Message received!',
      text: `I'll take a look at your message and get back to you ASAP.
             ---------- 
             ${req.body.message}`
    };
    mailer.transporter.sendMail(leadOptions, (error, info) => {
      if (error) {
        return res.sendStatus(501);
      }
      req.flash('success', 'Thanks for the note! Check your email: ' + req.body.email);
      res.redirect('/');
    });
  });
});


module.exports = router;
