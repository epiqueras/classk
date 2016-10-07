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

import { deleteTeacherUser } from '../../api/methods.js';

export default class TeacherInSchoolList extends React.Component {
  constructor(props) {
    super(props);
    this.deleteTeacher = this.deleteTeacher.bind(this);
  }

  deleteTeacher() {
    deleteTeacherUser.call({ teacherId: this.props.teacher.teacherId }, (error) => {
      if (error) {
        Alert.error(error.reason);
      } else {
        Alert.success('Teacher account deleted successfuly.');
      }
    });
  }

  render() {
    const { teacher } = this.props;

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
        <MenuItem onTouchTap={this.deleteTeacher}>Delete</MenuItem>
      </IconMenu>
    );
    return (
      <div>
        <ListItem
          leftAvatar={
            <Avatar src={Gravatar.imageUrl(teacher.md5hash, { secure: true, d: 'retro' })} />
          }
          rightIconButton={rightIconMenu}
          primaryText={`${teacher.firstName} ${teacher.lastName}`}
          primaryTogglesNestedList
          nestedItems={[
            <ListItem key={1} disabled>
              <div className="row">
                <div className="col-xs-6">{`Assignments Set: ${teacher.assignmentsSet}`}</div>
                <div className="col-xs-6">{`Answers: ${teacher.answers}`}</div>
              </div>
            </ListItem>,
          ]}
        />
        <Divider inset />
      </div>
    );
  }
}

TeacherInSchoolList.propTypes = {
  teacher: React.PropTypes.object,
};
