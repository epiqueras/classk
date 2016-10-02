/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Alert from 'react-s-alert';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

import { createStudentUser } from '../../api/methods.js';

export default class AddStudentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { errors: {} };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    const target = event.target;
    const firstName = target.firstName.value;
    const lastName = target.lastName.value;
    const email = target.email.value;
    const grade = target.grade.value;
    if (!firstName) {
      this.setState({
        errors: { firstName: 'First name is required.' },
      });
      return;
    }
    if (firstName.length > 30) {
      this.setState({
        errors: { firstName: 'First name may not exceed 30 characters.' },
      });
      return;
    }
    if (!lastName) {
      this.setState({
        errors: { lastName: 'Last name is required.' },
      });
      return;
    }
    if (lastName.length > 30) {
      this.setState({
        errors: { lastName: 'Last name may not exceed 30 characters.' },
      });
      return;
    }
    if (!email) {
      this.setState({
        errors: { email: "The student's email address is required." },
      });
      return;
    }
    if (!grade) {
      this.setState({
        errors: { grade: "The student's grade is required." },
      });
      return;
    }
    if (grade.length > 15) {
      this.setState({
        errors: { grade: 'Grade may not exceed 15 characters.' },
      });
      return;
    }
    createStudentUser.call({ firstName, lastName, email, grade }, (error) => {
      if (error) {
        Alert.error(error.reason);
      } else {
        Alert.success('Student account created successfuly.');
        this.props.toggleForm();
      }
    });
    target.firstName.value = '';
    target.lastName.value = '';
    target.email.value = '';
  }

  render() {
    return (
      <div className="row center-xs middle-xs">
      {this.props.createFormOpen ?
        <div className="col-xs-12">
          <Paper zDepth={1}>
            <form onChange={(e) => { e.stopPropagation(); }} onSubmit={this.onSubmit}>
              <TextField
                name="firstName"
                type="text"
                hintText="First Name"
                floatingLabelText="First Name"
                errorText={this.state.errors.firstName}
              />
              <br />
              <TextField
                name="lastName"
                type="text"
                hintText="Last Name"
                floatingLabelText="Last Name"
                errorText={this.state.errors.lastName}
              />
              <br />
              <TextField
                name="email"
                type="email"
                hintText="Student's Email Address"
                floatingLabelText="Student's Email Address"
                errorText={this.state.errors.email}
              />
              <br />
              <TextField
                name="grade"
                type="grade"
                hintText="Grade"
                floatingLabelText="Grade"
                errorText={this.state.errors.grade}
              />
              <br /><br /><br />
              <RaisedButton type="submit" label="Create Student" primary />
              <br /><br />
            </form>
          </Paper>
          <br /><br />
        </div>
      : ''}
      </div>
    );
  }
}

AddStudentForm.propTypes = {
  createFormOpen: React.PropTypes.bool,
  toggleForm: React.PropTypes.func,
};
