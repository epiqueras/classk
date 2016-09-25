/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import React from 'react';
import Alert from 'react-s-alert';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class ForgotPasswordPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { errors: {} };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    Meteor.logout();
  }

  onSubmit(event) {
    event.preventDefault();
    const target = event.target;
    const email = target.email.value;
    const confirmEmail = target.confirmEmail.value;
    if (!email) {
      this.setState({
        errors: { email: 'Email is required.' },
      });
      return;
    }
    if (!confirmEmail) {
      this.setState({
        errors: { confirmEmail: 'Please confirm your email.' },
      });
      return;
    }
    if (email !== confirmEmail) {
      Alert.error('Emails do not match');
      return;
    }
    Accounts.forgotPassword({ email }, (error) => {
      if (error) {
        if (error.error !== 'too-many-requests') {
          Alert.error(error.reason);
        }
      } else {
        Alert.success('Email sent successfuly');
        this.context.router.replace('/');
      }
    });
  }

  render() {
    return (
      <div className="full-height">
        <div className="row center-xs middle-xs login-row">
          <div className="col-xs-12 login-column">
            <h2>Enter your email to send a link to reset your password.</h2>
            <form onChange={(e) => { e.stopPropagation(); }} onSubmit={this.onSubmit}>
              <TextField
                name="email"
                type="email"
                hintText="Email Address"
                floatingLabelText="Email Address"
                errorText={this.state.errors.email}
              />
              <br />
              <TextField
                name="confirmEmail"
                type="email"
                hintText="Confirm Email Address"
                floatingLabelText="Confirm Email Address"
                errorText={this.state.errors.confirmEmail}
              />
              <br /><br /><br />
              <RaisedButton type="submit" label="Send Reset Link" primary />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

ForgotPasswordPage.contextTypes = {
  router: React.PropTypes.object,
  userId: React.PropTypes.string,
};
