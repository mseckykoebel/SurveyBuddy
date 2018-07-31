import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
  render() {
    return (
      <StripeCheckout
        name="SurveyBuddy"
        description="$0 for a whole 'lotta credits fam"
        amount={0}
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">Add Credits</button>
      </StripeCheckout>
    );
  }
}

export default connect(
  null,
  actions
)(Payments);

// the currency is not going to be the same for everything, but we finna stick
// need to tell stripe the currency and the amount (the default is US dollars)

// added the custom buton with custom styling from material design
