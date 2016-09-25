/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import React from 'react';
import Alert from 'react-s-alert';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { createSchoolUser } from '../../api/methods.js';

export default class HiddenAdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { errors: {} };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    // Check that the user is logged in before the component mounts
    if (!Meteor.loggingIn() && (!this.context.userId
      || !Roles.userIsInRole(this.context.userId, 'hidden-admin', Roles.GLOBAL_GROUP))) {
      this.context.router.replace('/404');
    }
  }

  componentDidUpdate() {
    // Navigate to a sign in page if the user isn't authenticated when data changes
    if (!Meteor.loggingIn() && (!this.context.userId
      || !Roles.userIsInRole(this.context.userId, 'hidden-admin', Roles.GLOBAL_GROUP))) {
      this.context.router.replace('/404');
    }
  }

  onSubmit(event) {
    event.preventDefault();
    const target = event.target;
    const schoolName = target.schoolName.value;
    const email = target.email.value;
    if (!schoolName) {
      this.setState({
        errors: { schoolName: 'School Name is required.' },
      });
      return;
    }
    if (!email) {
      this.setState({
        errors: { email: 'Email Address is required.' },
      });
      return;
    }
    createSchoolUser.call({ schoolName, email }, (error) => {
      if (error) {
        Alert.error(error.reason);
      } else {
        Alert.success('School account created successfuly.');
      }
    });
    target.schoolName.value = '';
    target.email.value = '';
  }

  onLogoutClick() {
    Meteor.logout();
  }

  render() {
    return (
      <div className="full-height">
        <div className="row center-xs middle-xs login-row">
          <div className="col-xs-12 login-column">
            <h2>Leave if not authorized</h2>
            <form onChange={(e) => { e.stopPropagation(); }} onSubmit={this.onSubmit}>
              <TextField
                name="schoolName"
                type="text"
                hintText="School Name"
                floatingLabelText="School Name"
                errorText={this.state.errors.schoolName}
              />
              <br />
              <TextField
                name="email"
                type="email"
                hintText="Email Address"
                floatingLabelText="Email Address"
                errorText={this.state.errors.email}
              />
              <br /><br /><br />
              <RaisedButton type="submit" label="Create School" primary />
            </form>
            <br /><br /><br />
            <RaisedButton onClick={this.onLogoutClick} label="Logout" primary />
          </div>
        </div>
      </div>
    );
  }
}

HiddenAdminPage.contextTypes = {
  router: React.PropTypes.object,
  userId: React.PropTypes.string,
  loginAttempts: React.PropTypes.array,
};
