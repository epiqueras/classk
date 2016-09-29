/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import Alert from 'react-s-alert';
import { List } from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';

import StudentInClassList from './StudentInClassList.jsx';
import AddStudentToClass from './AddStudentToClass.jsx';

export default class ClassCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardExpanded: false,
    };
    this.handleExpandChange = this.handleExpandChange.bind(this);
    this.toggleCardExpanded = this.toggleCardExpanded.bind(this);
    // this.deleteStudent = this.deleteStudent.bind(this);
  }

  handleExpandChange(isExpanded) {
    this.setState({ cardExpanded: isExpanded });
  }

  toggleCardExpanded() {
    this.setState({ cardExpanded: !this.state.cardExpanded });
  }

  render() {
    const theClass = this.props.theClass;

    const studentsInClassList = this.props.mySchoolStudents.filter(student => (
      theClass.studentIds.includes(student.studentId)
    )).map(student => (
      <StudentInClassList key={student.studentId} student={student} />
    ));

    return (
      <Card expanded={this.state.cardExpanded} onExpandChange={this.handleExpandChange}>
        <CardHeader
          title={theClass.name}
          subtitle={theClass.description}
          actAsExpander
          showExpandableButton
        />
        <CardActions>
          <FlatButton label="Assignments" />
          <FlatButton label="Edit Members" onTouchTap={this.toggleCardExpanded} />
        </CardActions>
        <CardText expandable>
          <Subheader style={{ textAlign: 'center', marginBottom: '2%' }}>Students</Subheader>
          <Divider />
          <AddStudentToClass
            mySchoolStudents={this.props.mySchoolStudents}
            theClassId={this.props.theClass._id}
          />
          <List>
            {studentsInClassList}
          </List>
        </CardText>
      </Card>
    );
  }
}

ClassCard.propTypes = {
  mySchoolStudents: React.PropTypes.array,
  theClass: React.PropTypes.object,
};
