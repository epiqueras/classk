/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import Alert from 'react-s-alert';
import SelectField from 'material-ui/SelectField';
import TimePicker from 'material-ui/TimePicker';
import DatePicker from 'material-ui/DatePicker';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

import TextEditor from './TextEditor.jsx';

import { insertNewAssignment } from '../../api/assignments/methods.js';

export default class AddAssignmentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      textJson: '',
      textCount: 0,
      selectedClass: '',
      selectedDate: '',
      selectedTime: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.getContentJson = this.getContentJson.bind(this);
    this.handleClassChange = this.handleClassChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    const target = event.target;
    const title = target.title.value;
    const theClassId = this.state.selectedClass;
    const selectedTime = this.state.selectedTime;
    const dueDate = this.state.selectedDate;
    const textJson = this.state.textJson;
    const textCount = this.state.textCount;
    if (!title) {
      this.setState({
        errors: { title: 'Assignment title is required.' },
      });
      return;
    }
    if (title.length > 30) {
      this.setState({
        errors: { title: 'Title may not exceed 30 characters.' },
      });
      return;
    }
    if (!theClassId) {
      Alert.error('Class is required.');
      return;
    }
    if (!dueDate) {
      Alert.error('Due date is required.');
      return;
    }
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (dueDate < tomorrow) {
      Alert.error('Due date has to be at least two nights from now.');
      return;
    }
    if (!selectedTime) {
      Alert.error('Time is required.');
      return;
    }
    if (!textJson) {
      Alert.error('Text is required.');
      return;
    }
    if (textCount > 10000) {
      Alert.error('Text may not exceed 10000 characters.');
      return;
    }
    const hours = selectedTime.getHours();
    const minutes = selectedTime.getMinutes();
    dueDate.setHours(hours);
    dueDate.setMinutes(minutes);
    insertNewAssignment.call({ title, theClassId, dueDate, textJson, textCount }, (error) => {
      if (error) {
        Alert.error(error.reason);
      } else {
        Alert.success('Assignment created successfuly!');
        this.props.toggleForm();
        target.title.value = '';
        this.setState({
          selectedClass: '',
          selectedDate: '',
          selectedTime: '',
        });
      }
    });
  }

  getContentJson(jsonString, textLength) {
    this.setState({ textJson: jsonString, textCount: textLength });
  }

  handleClassChange(event, index, value) {
    this.setState({ selectedClass: value });
  }

  handleDateChange(event, date) {
    this.setState({ selectedDate: date });
  }

  handleTimeChange(event, date) {
    this.setState({ selectedTime: date });
  }

  render() {
    let theClassesList = this.props.myClasses;
    if (theClassesList.length !== 0) {
      theClassesList = theClassesList.map(theClass => (
        <MenuItem key={theClass._id} value={theClass._id} primaryText={theClass.name} />
      ));
    } else {
      theClassesList = (
        <MenuItem key={1} value={0} primaryText="No classes available" />
      );
    }

    let selectedDate;
    let selectedTime;
    if (this.state.selectedDate === '') {
      selectedDate = {};
    } else {
      selectedDate = this.state.selectedDate;
    }
    if (this.state.selectedTime === '') {
      selectedTime = {};
    } else {
      selectedTime = this.state.selectedTime;
    }

    return (
      <div className="row center-xs middle-xs">
      {this.props.createFormOpen ?
        <div className="col-xs-12">
          <Paper zDepth={1}>
            <form onChange={(e) => { e.stopPropagation(); }} onSubmit={this.onSubmit}>
              <div className="row center-xs middle-xs around-xs">
                <div className="col-xs-12 col-sm-6">
                  <TextField
                    name="title"
                    type="text"
                    hintText="Title"
                    floatingLabelText="Title"
                    errorText={this.state.errors.title}
                  />
                </div>
                <div className="col-xs-12 col-sm-6">
                  <SelectField
                    value={this.state.selectedClass}
                    onChange={this.handleClassChange}
                    maxHeight={200}
                    floatingLabelText="Select a class"
                  >
                    {theClassesList}
                  </SelectField>
                </div>
                <div className="col-xs-12 col-sm-6">
                  <DatePicker
                    hintText="Select a due date"
                    value={selectedDate}
                    onChange={this.handleDateChange}
                  />
                </div>
                <div className="col-xs-12 col-sm-6">
                  <TimePicker
                    format="24hr"
                    hintText="Select a time"
                    value={selectedTime}
                    onChange={this.handleTimeChange}
                  />
                </div>
              </div>
              <br /><br />
              <div className="row">
                <div className="col-xs-12">
                  <TextEditor getContentJson={this.getContentJson} />
                </div>
              </div>
              <br />
              <RaisedButton type="submit" label="Create Assignment" primary />
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

AddAssignmentForm.propTypes = {
  createFormOpen: React.PropTypes.bool,
  toggleForm: React.PropTypes.func,
  classId: React.PropTypes.string,
  myClasses: React.PropTypes.array,
};
