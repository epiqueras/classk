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

import { deleteStudentUser } from '../../api/methods.js';

export default class StudentInSchoolList extends React.Component {
  constructor(props) {
    super(props);
    this.deleteStudent = this.deleteStudent.bind(this);
  }

  deleteStudent() {
    deleteStudentUser.call({ studentId: this.props.student.studentId }, (error) => {
      if (error) {
        Alert.error(error.reason);
      } else {
        Alert.success('Student account deleted successfuly.');
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
        <MenuItem onTouchTap={this.deleteStudent}>Delete</MenuItem>
      </IconMenu>
    );
    return (
      <div key={student.studentId}>
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
              <div className="row">
                <div className="col-xs-4">{`Questions: ${student.questions}`}</div>
                <div className="col-xs-4">
                  {`Accepted Answers: ${student.acceptedAnswers}/${student.answers}`}
                </div>
                <div className="col-xs-4">{`Points: ${student.points}`}</div>
              </div>
            </ListItem>,
          ]}
        />
        <Divider inset />
      </div>
    );
  }
}

StudentInSchoolList.propTypes = {
  student: React.PropTypes.object,
};
