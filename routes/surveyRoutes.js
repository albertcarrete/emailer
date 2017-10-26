const _ = require('lodash');
const Path = require('path-parser');
// Integrated Module in NODE.js system
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

// We take this approach instead of directly requiring,
// because testing can be glitchy if we don't.
const Survey = mongoose.model('surveys');

module.exports = app => {

  app.get('/api/surveys', requireLogin, async (req,res) => {
    const surveys = await Survey.find({ _user: req.user.id })
      .select({recipients: false})

    res.send(surveys);
  });

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for your feedback!');
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');

    _.chain(req.body)
      .map(({ url, email }) => {
        // cannot destructure match because it can possibly be null
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      // takes an array, goes through all elements and removes undefined
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            // increment either yes or no by 1
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date()
          }
        ).exec();
      })
      .value();

    res.send({});
  });
  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    // ES6 syntax, instead of doing title: title
    // ES6 syntax, instead of recipients: recipients.split(',').map(email => {return {email:email}})
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });

    // great place to send an email
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      // this is an async function
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      // og req.user is now stale, send updated user model
      const user = await req.user.save();
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
