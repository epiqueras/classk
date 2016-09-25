/* eslint-disable import/no-extraneous-dependencies */
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
// import { Schools } from '../../api/schools/schools.js';
import { Teachers } from '../../api/teachers/teachers.js';
import Teacher from '../layouts/Teacher.jsx';

export default createContainer(() => { // eslint-disable-line arrow-body-style
  const myTeacherObjectHandle = Meteor.subscribe('teachers.myTeacherObject');
  return {
    user: Meteor.user(),
    loading: !(myTeacherObjectHandle.ready()),
    myTeacherObject: Teachers.findOne({ teacherId: Meteor.userId() }),
  };
}, Teacher);
