/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Alert from 'react-s-alert';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

import { insertNewClass } from '../../api/classes/methods.js';

export default class AddClassForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { errors: {} };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    const target = event.target;
    const name = target.name.value;
    const description = target.description.value;
    if (!name) {
      this.setState({
        errors: { name: 'Class name is required.' },
      });
      return;
    }
    if (!description) {
      this.setState({
        errors: { description: 'Class description is required.' },
      });
      return;
    }
    insertNewClass.call({ name, description }, (error) => {
      if (error) {
        Alert.error(error.reason);
      } else {
        Alert.success('Class created successfuly. Now add some students to it!');
        this.props.toggleForm();
      }
    });
    target.name.value = '';
    target.description.value = '';
  }

  render() {
    return (
      <div className="row center-xs middle-xs">
      {this.props.createFormOpen ?
        <div className="col-xs-12">
          <Paper zDepth={1}>
            <form onChange={(e) => { e.stopPropagation(); }} onSubmit={this.onSubmit}>
              <TextField
                name="name"
                type="text"
                hintText="Class Name"
                floatingLabelText="Class Name"
                errorText={this.state.errors.name}
              />
              <br />
              <TextField
                name="description"
                type="text"
                hintText="Description"
                floatingLabelText="Description"
                errorText={this.state.errors.description}
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
