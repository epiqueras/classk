/* eslint-disable import/no-extraneous-dependencies */
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
// import { Schools } from '../../api/schools/schools.js';
import { Teachers } from '../../api/teachers/teachers.js';
import { Students } from '../../api/students/students.js';
import Teacher from '../layouts/Teacher.jsx';

export default createContainer(() => { // eslint-disable-line arrow-body-style
  const myTeacherObjectHandle = Meteor.subscribe('teachers.myTeacherObject');
  const mySchoolStudentsHandle = Meteor.subscribe('students.mySchoolStudents');
  return {
    user: Meteor.user(),
    loading: !(myTeacherObjectHandle.ready() && mySchoolStudentsHandle.ready()),
    myTeacherObject: Teachers.findOne({ teacherId: Meteor.userId() }),
    mySchoolStudents: Students.find({}).fetch(),
  };
}, Teacher);
