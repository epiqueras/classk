/* eslint-disable import/no-extraneous-dependencies */
import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Link } from 'react-router';
import Alert from 'react-s-alert';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import { getAppropiateRoute } from '../../api/methods.js';

import {
  insertNewAttempt,
  increaseAttempts,
  updateAttempts,
  removeAttempts } from '../../api/loginAttempts/methods.js';

export default class SignInPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { errors: {} };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    const target = event.target;
    const email = target.email.value;
    const password = target.password.value;
    let firstAttempt = false;
    let lastAttempt = false;

    if (!email) {
      this.setState({
        errors: { email: 'Email Address is required.' },
      });
      return;
    }
    if (!password) {
      this.setState({
        errors: { password: 'Password is required.' },
      });
      return;
    }

    const zeroDate = new Date(0);
    let timeOfFail = zeroDate;
    let timePassedSinceFail;
    let timeOut;

    if (!this.context.loginAttempts) {
      firstAttempt = true;
      insertNewAttempt.call({});
    } else if (this.context.loginAttempts.unsuccessfulAttempts >= 2) {
      lastAttempt = true;
    } else if (this.context.loginAttempts.unsuccessfulAttempts === 0) {
      timeOfFail = this.context.loginAttempts.lastFailAt;
      timePassedSinceFail = new Date() - timeOfFail;
      timeOut = new Date(120000);
    }

    if (timeOfFail.getTime() === zeroDate.getTime() || timePassedSinceFail >= timeOut) {
      Meteor.loginWithPassword(email, password, (error) => {
        if (error) {
          if (lastAttempt) {
            updateAttempts.call({});
          } else {
            increaseAttempts.call({});
          }
          if (error.error !== 'too-many-requests') {
            Alert.error(error.reason);
          }
        } else {
          removeAttempts.call({});
          Alert.success('Login Successful');
          this.context.router.replace(getAppropiateRoute.call({}));
        }
      });
    } else {
      let extraDigit = '';
      const timeLeft = timeOut - timePassedSinceFail;
      const minutes = (timeLeft / 1000 / 60) << 0;
      const seconds = ((timeLeft / 1000) % 60) << 0;
      if (seconds < 10) { extraDigit = 0; }
      Alert.error(`You must wait ${minutes}:${extraDigit}${seconds} minutes before trying again`);
    }
  }

  render() {
    return (
      <div className="full-height">
        <div className="row center-xs middle-xs login-row">
          <div className="col-xs-12 login-column">
            <h2>Welcome Back</h2>
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
                name="password"
                type="password"
                hintText="Password"
                floatingLabelText="Password"
                errorText={this.state.errors.password}
              />
              <br /><br /><br />
              <Link to="/forgot-password">
                <FlatButton className="left-forgot-button" label="Forgot Your Password?" primary />
              </Link>
              <RaisedButton className="right-signin-button" type="submit" label="Sign In" primary />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

SignInPage.contextTypes = {
  router: React.PropTypes.object,
  loginAttempts: React.PropTypes.object,
};
