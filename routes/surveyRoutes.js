// If anything comes to this route, run this funciton
// check to see if the user is loged in to make a surveys
// also, check to make sure they have enough credits

const mongoose = require("mongoose");
// mongoose model class -> used to create an instance of a survey
// 1 - create
// 2 - use the save funciton to save to the database
const Survey = mongoose.model("surveys");

const _ = require("lodash");
const Path = require("path-parser");
const { URL } = require("url"); // integrated Node.js system, helps parse URL's
// require in the middleware that already does this for us
const requireLogin = require("../middlewares/requireLogin"); // will not be called
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");



// the route hander itself
// required in the order of execution
// NOTE: req = incoming request object, and res = response object
module.exports = app => {
  ////////////////////////
  // displaying all of the previous serverys when whe smack the dashboard

  app.get("/api/surveys", requireLogin, async (req, res) => {
    // pulls out all of the different surveys pulled out by the current user
    // req.user is the current user
    // every survey has _user property, and contains the id of the user
    // tell mongoose to fetch all of the surveys
    const surveys = await Survey.find({ _user: req.user.id }) // the query
      .select({ recipients: false }); // dont include recipients property
    // ensure the user is logged in with the logged in middleware...

    // send the response back and here is the list
    res.send(surveys);
  });

  //////////////////////

  // quick response to the user...saying a big ole ty
  app.get("/api/surveys/:surveyId/:choice", (req, res) => {
    res.send("Thanks for submitting a response!");
  });
  ////////////////////////

  // look at the incoming array of events and process it
  // event -> email, and the uel properties out of this (ES6 refactoring)
  app.post("/api/surveys/webhooks", (req, res) => {
    // extract using the colons, and we tell the Path library this!!!
    // can use p to extract the survey ID and the choice
    const p = new Path("/api/surveys/:surveyId/:choice");
    _.chain(req.body) // iterate over req.body array
      .map(({ email, url }) => {
        // use the URl helper to only get the route
        const match = p.test(new URL(url).pathname);
        if (match) {
          return {
            email: email, // NOT event.email
            surveyId: match.surveyId,
            choice: match.choice
          }; // if match was found, return the match object
        }
      })

      // make use of the compact function -> removes undefined values
      .compact() // no undefined elements

      // another lodash helper
      // makes sure we have no duplicate survey or Id
      // if one user votes on 2 different survey Id's, they cannot do, as no
      // multi-votes!!!
      .uniqBy("email", "surveyId")
      // iterate over the steps that have been calculated and
      // more destructuring
      .each(({ surveyId, email, choice }) => {
        // this is async, but not gonna add, as in the context of webhook, have
        // nothing to send to sendGrid.....don't have to respond to sendGrid
        Survey.updateOne(
          {
            // remember the underscore
            _id: surveyId,
            // look through recipients property, with array of records
            // go through all of them, and find the recipient with email of
            // email, and that the response property is false.
            // if not all three are true, go and find another record
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            // update the survey and find it directly in the mongo world
            // all we care for is updating the survey

            // NOTE: logic to update the number of responses and the number of
            // NOTE: the given choice of yes and no. DOES NOT CREATE ARRAY
            $inc: { [choice]: 1 }, // mongo operator with some slightly intellegentness
            // update one of the properties in the survey
            // update the recipient that we care about, as there are alot of them
            // matches with the additional query, index of something is used in place of
            // the dollar sign

            // look at the responded property, and set to be true
            $set: { "recipients.$.responded": true },
            lastResponded: new Date()
          }
        ).exec(); // exec -> execute puts the query together, but does not send it
      }) // run over every element in the events array
      .value();

    console.log(events);

    res.send({});
  });

  //////////////////////////

  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    // this is how, in ES6, we access the properties
    const { title, subject, body, recipients } = req.body;
    // use the Survey model to create a new mongoose model instance
    const survey = new Survey({
      title: title, // or title, in ES6
      subject: subject,
      body: body,
      // creation of the subdocument schema
      // split with a comma

      // creates an object with key of email and value of the inputted email
      // trims the trailing and leading spaces on the input with trim()
      recipients: recipients.split(",").map(email => ({ email: email.trim() })),

      _user: req.user.id, // pass in the user ID, generated by mongo (issa property)
      dateSent: Date.now() // returns date object, records creation and sending
    });

    // NOTE: this is a good place to send an email -> after we have the POST
    // NOTE: survey has a subject and a recipients property, just has to have these two
    const mailer = new Mailer(survey, surveyTemplate(survey));

    // NOTE: all in a try{} blobk becuase of errors
    // sending the email (trying it out!!!)
    // this is an async funciton and we want to wait for this to finish before we continue
    // make sure the async code inside mailer is done
    try {
      await mailer.send();
      await survey.save();

      // deduct one credit
      req.user.credits -= 1;

      // save the _user
      const user = await req.user.save();

      // send back the updated user model, just like we do when the user pays for something
      res.send(user);
    } catch (err) {
      // unprocessable entity, you have done somehting wrong!
      res.status(422).send(err);
    }

    // after we send the mailer, call save on the survey to save the mailer to the database
  });
};
