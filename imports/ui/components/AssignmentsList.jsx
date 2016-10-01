import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import { List, ListItem } from 'material-ui/List';
import QuestionAnswer from 'material-ui/svg-icons/action/question-answer';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import Assignment from 'material-ui/svg-icons/action/assignment';
import AssignmentTurnedIn from 'material-ui/svg-icons/action/assignment-turned-in';

// TODO:
// Keep working on assignments.

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

  render() {
    const openAssignmentList = (
      <List>
        <Subheader inset>Files</Subheader>
        <ListItem
          leftAvatar={<Avatar icon={<Assignment />} backgroundColor={'#00BCD4'} />}
          rightIcon={<QuestionAnswer />}
          primaryText="Math paper."
          secondaryText="Jan 20, 2014"
        />
        <ListItem
          leftAvatar={<Avatar icon={<Assignment />} backgroundColor={'#00BCD4'} />}
          rightIcon={<QuestionAnswer />}
          primaryText="Study for test."
          secondaryText="Jan 10, 2014"
        />
      </List>
    );
    const closedAssignmentList = (
      <List>
        <Subheader inset>Files</Subheader>
        <ListItem
          leftAvatar={<Avatar icon={<AssignmentTurnedIn />} backgroundColor={'#00BCD4'} />}
          rightIcon={<QuestionAnswer />}
          primaryText="Math paper."
          secondaryText="Jan 20, 2014"
        />
        <ListItem
          leftAvatar={<Avatar icon={<AssignmentTurnedIn />} backgroundColor={'#00BCD4'} />}
          rightIcon={<QuestionAnswer />}
          primaryText="Study for test."
          secondaryText="Jan 10, 2014"
        />
      </List>
    );

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
            style={{ backgroundColor: '#3F51B5' }}
          />
          <Tab
            icon={<AssignmentTurnedIn />}
            label="Closed"
            value={1}
            style={{ backgroundColor: '#3F51B5' }}
          />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >
          <div>
            {openAssignmentList}
          </div>
          <div>
            {closedAssignmentList}
          </div>
        </SwipeableViews>
      </div>
    );
  }
}

AssignmentsList.propTypes = {
};

AssignmentsList.contextTypes = {
};
