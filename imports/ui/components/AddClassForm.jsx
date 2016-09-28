/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Alert from 'react-s-alert';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

import { createTeacherUser } from '../../api/methods.js';

export default class AddClassForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { errors: {} };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    const target = event.target;
    const theClassName = target.theClassName.value;
    const theClassDescription = target.theClassDescription.value;
    // if (!firstName) {
    //   this.setState({
    //     errors: { firstName: 'First name is required.' },
    //   });
    //   return;
    // }
    // if (!lastName) {
    //   this.setState({
    //     errors: { lastName: 'Last name is required.' },
    //   });
    //   return;
    // }
    // if (!email) {
    //   this.setState({
    //     errors: { email: "The teacher's email address is required." },
    //   });
    //   return;
    // }
    // createTeacherUser.call({ firstName, lastName, email }, (error) => {
    //   if (error) {
    //     Alert.error(error.reason);
    //   } else {
    //     Alert.success('Teacher account created successfuly.');
    //     this.props.toggleForm();
    //   }
    // });
    target.theClassName.value = '';
    target.theClassDescription.value = '';
  }

  render() {
    return (
      <div className="row center-xs middle-xs">
      {this.props.createFormOpen ?
        <div className="col-xs-12">
          <Paper zDepth={1}>
            <form onChange={(e) => { e.stopPropagation(); }} onSubmit={this.onSubmit}>
              <TextField
                name="theClassName"
                type="text"
                hintText="Class Name"
                floatingLabelText="Class Name"
                errorText={this.state.errors.theClassName}
              />
              <br />
              <TextField
                name="theClassDescription"
                type="text"
                hintText="Description"
                floatingLabelText="Description"
                errorText={this.state.errors.theClassDescription}
              />
              <br /><br /><br />
              <RaisedButton type="submit" label="Create Class" primary />
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

AddClassForm.propTypes = {
  createFormOpen: React.PropTypes.bool,
  toggleForm: React.PropTypes.func,
};
