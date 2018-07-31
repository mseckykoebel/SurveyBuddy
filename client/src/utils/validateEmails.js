// This file returns a function...
// This function does the validation of the emails

// assign shitty characters:
const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default emails => {
  // separate the emails by a comma for em...
  // use the trim method to remove the space
  // returns a new array
  const invalidEmails = emails
    .split(",")
    .map(email => email.trim())
    .filter(
      email =>
        // if the email matches the regular expression, returns true, and
        // invalid, return false, which is what is wanted
        re.test(email) === false
    ); // get emails that fail the test

  if (invalidEmails.length) {
    return `These emails are invalid: ${invalidEmails}`;
  }

  return;
};
