/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import FlatButton from 'material-ui/FlatButton';
import { List } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

import AddTeacherForm from '../components/AddTeacherForm.jsx';
import TeacherInSchoolList from '../components/TeacherInSchoolList.jsx';

export default class SchoolTeachersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      createButtonToggled: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
  }

  handleChange(event) {
    this.setState({
      searchValue: event.target.value,
    });
  }

  toggleForm() {
    this.setState({
      createButtonToggled: !this.state.createButtonToggled,
    });
  }

  render() {
    const teachersList = this.context.myTeachers.filter(teacher => (
      (`${teacher.firstName} ${teacher.lastName}`).toLowerCase().includes(
        this.state.searchValue.toLowerCase()
      )
    )).map(teacher => (
      <TeacherInSchoolList key={teacher.teacherId} teacher={teacher} />
    ));

    return (
      <div className="row center-xs middle-xs">
        <div className="col-xs-12">
          <div className="row middle-xs center-xs">
            <div className="col-xs-7 col-sm-8">
              <TextField
                id="text-field-controlled"
                value={this.state.searchValue}
                onChange={this.handleChange}
                fullWidth
                hintText="Search...."
                floatingLabelText="Search for a Teacher...."
              />
            </div>
            <div className="col-xs-4 col-sm-3">
              <FlatButton label="Add Teacher" icon={<PersonAdd />} onClick={this.toggleForm} />
            </div>
          </div>
        </div>
        <div className="col-xs-12">
          <AddTeacherForm
            createFormOpen={this.state.createButtonToggled}
            toggleForm={this.toggleForm}
          />
        </div>
        <div className="col-xs-12">
          <div className="row center-xs">
            <div className="col-xs-11">
              <Paper zDepth={1}>
                <List>
                  <Subheader>Teachers</Subheader>
                  <Divider />
                  {teachersList}
                </List>
              </Paper>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SchoolTeachersPage.contextTypes = {
  router: React.PropTypes.object,
  userId: React.PropTypes.string,
  myTeachers: React.PropTypes.array,
};
