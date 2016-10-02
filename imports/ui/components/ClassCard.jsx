/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Link } from 'react-router';
import Badge from 'material-ui/Badge';
import Alert from 'react-s-alert';
import { List } from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { grey400 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import DeleteForever from 'material-ui/svg-icons/action/delete-forever';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import StudentInClassList from './StudentInClassList.jsx';
import AddStudentToClass from './AddStudentToClass.jsx';

import { deleteClass } from '../../api/classes/methods.js';

export default class ClassCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardExpanded: false,
    };
    this.handleExpandChange = this.handleExpandChange.bind(this);
    this.toggleCardExpanded = this.toggleCardExpanded.bind(this);
    this.deleteTheClass = this.deleteTheClass.bind(this);
  }

  handleExpandChange(isExpanded) {
    this.setState({ cardExpanded: isExpanded });
  }

  toggleCardExpanded() {
    this.setState({ cardExpanded: !this.state.cardExpanded });
  }

  deleteTheClass() {
    const theClassId = this.props.theClass._id;
    deleteClass.call({ theClassId }, (error) => {
      if (error) {
        Alert.error(error.reason);
      } else {
        Alert.success('Class deleted succesfuly.');
      }
    });
  }

  render() {
    const theClass = this.props.theClass;

    const studentsInClassList = this.props.mySchoolStudents.filter(student => (
      theClass.studentIds.includes(student.studentId)
    )).map(student => (
      <StudentInClassList
        key={student.studentId}
        student={student}
        theClassId={this.props.theClass._id}
      />
    ));

    const iconButtonElement = (
      <IconButton
        touch
        tooltip="Delete Class"
        tooltipPosition="top-right"
      >
        <DeleteForever color={grey400} />
      </IconButton>
    );

    return (
      <Card expanded={this.state.cardExpanded} onExpandChange={this.handleExpandChange}>
        <CardHeader
          title={theClass.name}
          subtitle={theClass.description}
          actAsExpander
          showExpandableButton
        />
        <CardActions>
          <Link to={`/teacher/assignments/${theClass._id}`}>
            {this.props.notifications && this.props.notifications !== 0 ?
              <Badge
                badgeContent={3}
                primary
              >
                <FlatButton label="Assignments" style={{ margin: '-14px' }} />
              </Badge>
            :
              <FlatButton label="Assignments" style={{ margin: '-14px' }} />
            }
          </Link>
          <FlatButton
            label="Edit Members"
            onTouchTap={this.toggleCardExpanded}
            style={{ marginLeft: '-1px' }}
          />
          <IconMenu
            iconButtonElement={iconButtonElement}
            style={{ position: 'absolute', right: '-14px', bottom: '-4px' }}
          >
            <MenuItem onTouchTap={this.deleteTheClass}>Confirm Deletion</MenuItem>
          </IconMenu>
        </CardActions>
        <CardText expandable>
          <Divider />
          <Subheader style={{ textAlign: 'center', marginTop: '0.5%', marginBottom: '0.5%' }}>
            Students
          </Subheader>
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
  notifications: React.PropTypes.number,
};
