// assue we are receiving the survey as the argument
// survey model has the body property -> actual body text the user wants to show inside the text
const keys = require("../../config/keys");

module.exports = survey => {
  // returning  amulti-lin estring, using string templates
  return `
    <html>
      <body>
        <div style="text-align: center">
          <h3>I'd like your input</h3>
          <p>Please answer the following question:</p>
          <!-- here is the body of the survey -->
          <p>${survey.body}</p>
            <div>
              <a href:"${keys.redirectDomain}/api/surveys/${
    survey.id
  }/yes">Yes</a>
            </div>
            <div>
              <a href:"${keys.redirectDomain}/api/surveys/${
    survey.id
  }/no">No</a>
            </div>
        </div>
      </body>
    </html>
  `;
};
