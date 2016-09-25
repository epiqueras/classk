/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import React from 'react';
import Alert from 'react-s-alert';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { getAppropiateRoute } from '../../api/methods.js';

export default class EnrollAccountPage extends React.Component {
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
    const password = target.password.value;
    const confirmPassword = target.confirmPassword.value;
    if (!password) {
      this.setState({
        errors: { password: 'Password is required.' },
      });
      return;
    }
    if (!confirmPassword) {
      this.setState({
        errors: { confirmPassword: 'Please confirm your password.' },
      });
      return;
    }
    if (password !== confirmPassword) {
      Alert.error('Passwords do not match');
      return;
    }

    Accounts.resetPassword(this.props.params.token, password, (error) => {
      if (error) {
        this.context.router.replace('/');
        Alert.error(error.reason);
      } else {
        Alert.success('Password set successfuly');
        this.context.router.replace(getAppropiateRoute.call({}));
      }
    });
  }

  render() {
    return (
      <div className="full-height">
        <div className="row center-xs middle-xs login-row">
          <div className="col-xs-12 login-column">
            <h2>Set your password to finish signing up.</h2>
            <form onChange={(e) => { e.stopPropagation(); }} onSubmit={this.onSubmit}>
              <TextField
                name="password"
                type="password"
                hintText="Password"
                floatingLabelText="Password"
                errorText={this.state.errors.password}
              />
              <br />
              <TextField
                name="confirmPassword"
                type="password"
                hintText="Confirm Password"
                floatingLabelText="Confirm Password"
                errorText={this.state.errors.confirmPassword}
              />
              <br /><br /><br />
              <RaisedButton type="submit" label="Set Password" primary />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

EnrollAccountPage.propTypes = {
  params: React.PropTypes.object,
};

EnrollAccountPage.contextTypes = {
  router: React.PropTypes.object,
  userId: React.PropTypes.string,
};
