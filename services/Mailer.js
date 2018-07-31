// another service...like passport lmao
// NOTE: this sends the emails

const sendgrid = require("sendgrid"); // imports the sendgrid object
const helper = sendgrid.mail; // property from sendgrid object, helps make the mailer
const keys = require("../config/keys");

// setting up the mailer class
// NOTE: similar to the react component
// take mailer class and add on some additional customizer
// contains setup inherited from the mail object
// extends the mail base class
class Mailer extends helper.Mail {
  // called automatically when we use the new keyword
  // will receive 'survey' and 'surveyTemplate(survey)' in this area
  //// NOTE: we can call the mailer in the future with new subject and new
  //// NOTE: list of recipients, and some different content
  constructor({ subject, recipients }, content) {
    // implementing the constructor function
    // this is what sendgrid expects
    super(); // super executes the constructor stuff

    // represents the sendGrid object were gonna use to communicate the mailer
    // to the sendgrid addPersonalization
    this.sgApi = sendgrid(keys.sendGridKey);

    // who this email appears to be sent from
    // NOTE: helper is given by sendgrid
    this.from_email = new helper.Email("no-reply@surveybuddy.com");
    this.subject = subject;
    // some html to display inside of the email
    this.body = new helper.Content("text/html", content);
    // list of the recipients
    // formatAddress ->
    // who should the email be send off to?!
    // turn each recipient into the
    this.recipients = this.formatAddresses(recipients);
    // register the body with the mailer
    this.addContent(this.body); // define this below
    // enabling click tracking of the responses:
    this.addClickTracking(); // define this below
    this.addRecipients(); // define this below
  }

  // extract the email from recipients
  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      // inside of the map statement
      // format with email helper, then return it
      return new helper.Email(email); // pass in the extracted email
    });
  }

  // lmao this is just how it works
  addClickTracking() {
    // two helper variables
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    const personalize = new helper.Personalization();
    // iterate over the list of recipients
    // helper.email thing
    // take and add to the personalize object
    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });
    /// add the entire personalize object to the Mailer base class
    this.addPersonalization(personalize);
  }

  // function to communicate and send the entire mailer off to the sendGrid API:
  async send() {
    // sendgrid API request
    const request = this.sgApi.emptyRequest({
      method: "POST",
      path: "/v3/mail/send",
      body: this.toJSON()
    });
    // on the api object, call the API function, provided my sendGrid API
    const response = await this.sgApi.API(request);
    return response;
  }
}

module.exports = Mailer;
