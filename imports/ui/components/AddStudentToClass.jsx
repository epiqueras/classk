/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Alert from 'react-s-alert';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import PersonAdd from 'material-ui/svg-icons/social/person-add';

import { addToClass } from '../../api/classes/methods.js';

export default class AddStudentToClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
    this.handleNewRequest = this.handleNewRequest.bind(this);
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
  }

  handleNewRequest(chosenRequest) {
    const theClassId = this.props.theClassId;
    const studentId = chosenRequest.studentId;
    addToClass.call({ theClassId, studentId }, (error) => {
      if (error) {
        Alert.error(error.reason);
      } else {
        Alert.success('Student added to class.');
      }
    });
    this.setState({ searchText: '' });
  }

  handleUpdateInput(searchText) {
    this.setState({ searchText });
  }

  render() {
    const mySchoolStudentsList = this.props.mySchoolStudents.map((student) => (
      {
        text: `${student.firstName} ${student.lastName}`,
        value: (
          <MenuItem
            primaryText={`${student.firstName} ${student.lastName}`}
            rightIcon={<PersonAdd />}
          />
        ),
        studentId: student.studentId,
      }
    ));

    return (
      <div className="row middle-xs center-xs">
        <div className="col-xs-11">
          <AutoComplete
            fullWidth
            floatingLabelText="Add Student to Class"
            hintText="Type Name and Click to Add"
            filter={AutoComplete.fuzzyFilter}
            dataSource={mySchoolStudentsList}
            onNewRequest={this.handleNewRequest}
            onUpdateInput={this.handleUpdateInput}
            searchText={this.state.searchText}
          />
        </div>
      </div>
    );
  }
}

AddStudentToClass.propTypes = {
  mySchoolStudents: React.PropTypes.array,
  theClassId: React.PropTypes.string,
};
