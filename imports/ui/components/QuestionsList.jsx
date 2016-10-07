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
import CheckBox from 'material-ui/svg-icons/toggle/check-box';
import Feedback from 'material-ui/svg-icons/action/feedback';

export default class QuestionsList extends React.Component {
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

  render() {
    const questions = this.props.questions;
    let openQuestionsList = questions.filter(question => (
      question.answered === false
    )).sort((questionA, questionB) => (
      questionB.createdAt - questionA.createdAt
    )).map(question => (
      <div key={question._id}>
        <Link
          to={!this.props.studentView ?
            `/teacher/questions/${question.assignmentId}/answers/${question._id}`
          :
            `/student/questions/${question.assignmentId}/answers/${question._id}`
          }
        >
          <ListItem
            leftAvatar={
              <Avatar
                icon={<Feedback />}
                backgroundColor={this.context.myColors.accent1Color}
              />
            }
            rightIcon={question.answers !== 0 ?
              <Badge badgeContent={question.answers} primary style={{ top: '-5px' }}>
                <QuestionAnswer style={{ position: 'absolute', top: '15px' }} />
              </Badge>
            :
              <QuestionAnswer />
            }
            primaryText={question.title}
          />
        </Link>
        <Divider inset />
      </div>
    ));
    let closedQuestionsList = questions.filter(question => (
      question.answered === true
    )).sort((questionA, questionB) => (
      questionB.createdAt - questionA.createdAt
    )).map(question => (
      <div key={question._id}>
        <Link
          to={!this.props.studentView ?
            `/teacher/questions/${question.assignmentId}/answers/${question._id}`
          :
            `/student/questions/${question.assignmentId}/answers/${question._id}`
          }
        >
          <ListItem
            leftAvatar={
              <Avatar
                icon={<CheckBox />}
                backgroundColor={this.context.myColors.accent1Color}
              />
            }
            rightIcon={question.answers !== 0 ?
              <Badge badgeContent={question.answers} primary style={{ top: '-5px' }}>
                <QuestionAnswer style={{ position: 'absolute', top: '15px' }} />
              </Badge>
            :
              <QuestionAnswer />
            }
            primaryText={question.title}
          />
        </Link>
        <Divider inset />
      </div>
    ));

    if (openQuestionsList.length <= 0) {
      openQuestionsList = (
        <div>
          <Divider />
          <Subheader inset style={{ backgroundColor: '#e6e6e6' }}>
            No new questions to display for this assignment.
          </Subheader>
          <Divider />
        </div>
      );
    }
    if (closedQuestionsList.length <= 0) {
      closedQuestionsList = (
        <div>
          <Divider />
          <Subheader inset style={{ backgroundColor: '#e6e6e6' }}>
            No answered questions to display for this assignment.
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
            icon={<Feedback />}
            label="New"
            value={0}
            style={{ backgroundColor: this.context.myColors.primary2Color }}
          />
          <Tab
            icon={<CheckBox />}
            label="Answered"
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
              <Divider />
              {openQuestionsList}
            </List>
          </div>
          <div>
            <List>
              <Divider />
              {closedQuestionsList}
            </List>
          </div>
        </SwipeableViews>
      </div>
    );
  }
}

QuestionsList.propTypes = {
  questions: React.PropTypes.array,
  studentView: React.PropTypes.bool,
};

QuestionsList.contextTypes = {
  router: React.PropTypes.object,
  myColors: React.PropTypes.object,
};
