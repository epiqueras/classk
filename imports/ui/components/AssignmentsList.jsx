/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Link } from 'react-router';
import Badge from 'material-ui/Badge';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import { List, ListItem } from 'material-ui/List';
import QuestionAnswer from 'material-ui/svg-icons/action/question-answer';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import Assignment from 'material-ui/svg-icons/action/assignment';
import AssignmentTurnedIn from 'material-ui/svg-icons/action/assignment-turned-in';

export default class AssignmentsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({
      slideIndex: value,
    });
  }

  toWeekday(weekNumber) {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',
      'Saturday',
    ];
    return weekdays[weekNumber];
  }

  toMonthName(monthNumber) {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];
    return monthNames[monthNumber];
  }

  render() {
    const assignments = this.props.assignments;
    const classId = this.props.classId;
    const today = new Date();
    let lastOpenDay;
    let openAssignmentList = assignments.filter(assignment => (
      assignment.dueDate > today && (!classId || classId === assignment.classId)
    )).sort((assignmentA, assignmentB) => (
      assignmentA.dueDate - assignmentB.dueDate
    )).map(assignment => {
      let divider;
      const dueDate = new Date(assignment.dueDate.getTime());
      const dueDay = dueDate.getDay();
      const dueDateNumber = dueDate.getDate();
      const dueMonth = dueDate.getMonth();
      if (lastOpenDay !== dueDay) {
        divider = (
          <div>
            <Divider />
            <Subheader inset style={{ backgroundColor: '#e6e6e6' }}>
              {`${this.toWeekday(dueDay)} ${this.toMonthName(dueMonth)} ${dueDateNumber}`}
            </Subheader>
            <Divider inset />
          </div>
        );
        lastOpenDay = dueDay;
      } else {
        divider = '';
      }
      let className = '';
      if (!this.props.classId) {
        className = this.props.myClasses.find(theClass => (
          theClass._id === assignment.classId
        )).name;
        className = ` (${className})`;
      }
      return (
        <div key={assignment._id}>
          {divider}
          <Link
            to={!this.props.studentView ? `/teacher/questions/${assignment._id}`
            : `/student/questions/${assignment._id}`}
          >
            <ListItem
              leftAvatar={
                <Avatar
                  icon={<Assignment />}
                  backgroundColor={this.context.myColors.accent1Color}
                />
              }
              rightIcon={assignment.unanswered !== 0 ?
                <Badge badgeContent={assignment.unanswered} primary style={{ top: '0px' }}>
                  <QuestionAnswer />
                </Badge>
              :
                <QuestionAnswer />
              }
              primaryText={assignment.title + className}
              secondaryText={`Time: ${dueDate.toString().slice(16)}`}
            />
          </Link>
        </div>
      );
    });

    let lastClosedDay;
    let closedAssignmentList = assignments.filter(assignment => (
      assignment.dueDate < today && (!classId || classId === assignment.classId)
    )).sort((assignmentA, assignmentB) => (
      assignmentA.dueDate - assignmentB.dueDate
    )).map(assignment => {
      let divider;
      const dueDate = new Date(assignment.dueDate.getTime());
      const dueDay = dueDate.getDay();
      const dueDateNumber = dueDate.getDate();
      const dueMonth = dueDate.getMonth();
      if (lastClosedDay !== dueDay) {
        divider = (
          <div>
            <Divider />
            <Subheader inset style={{ backgroundColor: '#e6e6e6' }}>
              {`${this.toWeekday(dueDay)} ${this.toMonthName(dueMonth)} ${dueDateNumber}`}
            </Subheader>
            <Divider inset />
          </div>
        );
        lastClosedDay = dueDay;
      } else {
        divider = '';
      }
      let className = '';
      if (!this.props.classId) {
        className = this.props.myClasses.find(theClass => (
          theClass._id === assignment.classId
        )).name;
        className = ` (${className})`;
      }
      return (
        <div key={assignment._id}>
          {divider}
          <Link
            to={!this.props.studentView ? `/teacher/questions/${assignment._id}`
            : `/student/questions/${assignment._id}`}
          >
            <ListItem
              leftAvatar={
                <Avatar
                  icon={<AssignmentTurnedIn />}
                  backgroundColor={this.context.myColors.accent1Color}
                />
              }
              rightIcon={assignment.unanswered !== 0 ?
                <Badge badgeContent={assignment.unanswered} primary style={{ top: '0px' }}>
                  <QuestionAnswer />
                </Badge>
              :
                <QuestionAnswer />
              }
              primaryText={assignment.title + className}
              secondaryText={`Due Date: ${dueDate.toString()}`}
            />
          </Link>
        </div>
      );
    });

    if (openAssignmentList.length <= 0) {
      openAssignmentList = (
        <div>
          <Divider />
          <Subheader inset style={{ backgroundColor: '#e6e6e6' }}>
            No open assignments to display {classId ? 'for this class' : ''}
          </Subheader>
          <Divider />
        </div>
      );
    }
    if (closedAssignmentList.length <= 0) {
      closedAssignmentList = (
        <div>
          <Divider />
          <Subheader inset style={{ backgroundColor: '#e6e6e6' }}>
            No closed assignments to display {classId ? 'for this class' : ''}
          </Subheader>
          <Divider />
        </div>
      );
    }

    return (
      <div>
        <Tabs
          onChange={this.handleChange}
          value={this.state.slideIndex}
        >
          <Tab
            icon={<Assignment />}
            label="Open"
            value={0}
            style={{ backgroundColor: this.context.myColors.primary2Color }}
          />
          <Tab
            icon={<AssignmentTurnedIn />}
            label="Closed"
            value={1}
            style={{ backgroundColor: this.context.myColors.primary2Color }}
          />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >
          <div>
            <List>
              {openAssignmentList}
            </List>
          </div>
          <div>
            <List>
              {closedAssignmentList}
            </List>
          </div>
        </SwipeableViews>
      </div>
    );
  }
}

AssignmentsList.propTypes = {
  assignments: React.PropTypes.array,
  classId: React.PropTypes.string,
  myClasses: React.PropTypes.array,
  studentView: React.PropTypes.bool,
};

AssignmentsList.contextTypes = {
  router: React.PropTypes.object,
  myColors: React.PropTypes.object,
};
