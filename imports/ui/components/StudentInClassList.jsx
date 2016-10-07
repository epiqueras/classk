/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Gravatar } from 'meteor/jparker:gravatar';
import Alert from 'react-s-alert';
import Avatar from 'material-ui/Avatar';
import { ListItem } from 'material-ui/List';
import { grey400 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

import { removeFromClass } from '../../api/classes/methods.js';

export default class StudentInSchoolList extends React.Component {
  constructor(props) {
    super(props);
    this.removeStudent = this.removeStudent.bind(this);
  }

  removeStudent() {
    const theClassId = this.props.theClassId;
    const studentId = this.props.student.studentId;
    removeFromClass.call({ theClassId, studentId }, (error) => {
      if (error) {
        Alert.error(error.reason);
      } else {
        Alert.success('Student removed successfuly.');
      }
    });
  }

  render() {
    const { student } = this.props;

    const iconButtonElement = (
      <IconButton
        touch
        tooltip="more"
        tooltipPosition="top-right"
      >
        <MoreVertIcon color={grey400} />
      </IconButton>
    );

    const rightIconMenu = (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem onTouchTap={this.removeStudent}>Remove</MenuItem>
      </IconMenu>
    );
    return (
      <div>
        {!this.props.studentView ?
          <ListItem
            leftAvatar={
              <Avatar src={Gravatar.imageUrl(student.md5hash, { secure: true, d: 'retro' })} />
            }
            rightIconButton={rightIconMenu}
            primaryText={`${student.firstName} ${student.lastName}`}
            secondaryText={`Grade ${student.grade}`}
            primaryTogglesNestedList
            nestedItems={[
              <ListItem key={1} disabled>
                <div className="row center-xs middle-xs">
                  <div className="col-xs-6">{`Questions: ${student.questions}`}</div>
                  <div className="col-xs-6">
                    {`Accepted Answers: ${student.acceptedAnswers}/${student.answers}`}
                  </div>
                </div>
              </ListItem>,
            ]}
          />
        :
          <ListItem
            leftAvatar={
              <Avatar src={Gravatar.imageUrl(student.md5hash, { secure: true, d: 'retro' })} />
            }
            primaryText={`${student.firstName} ${student.lastName}`}
            secondaryText={`Grade ${student.grade}`}
            primaryTogglesNestedList
            nestedItems={[
              <ListItem key={1} disabled>
                <div className="row center-xs middle-xs">
                  <div className="col-xs-6">{`Questions: ${student.questions}`}</div>
                  <div className="col-xs-6">
                    {`Accepted Answers: ${student.acceptedAnswers}/${student.answers}`}
                  </div>
                </div>
              </ListItem>,
            ]}
          />
        }
        <Divider inset />
      </div>
    );
  }
}

StudentInSchoolList.propTypes = {
  student: React.PropTypes.object,
  theClassId: React.PropTypes.string,
  studentView: React.PropTypes.bool,
};
