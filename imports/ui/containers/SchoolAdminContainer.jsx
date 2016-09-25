/* eslint-disable import/no-extraneous-dependencies */
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Schools } from '../../api/schools/schools.js';
import { Teachers } from '../../api/teachers/teachers.js';
import { Students } from '../../api/students/students.js';
import SchoolAdmin from '../layouts/SchoolAdmin.jsx';

export default createContainer(() => { // eslint-disable-line arrow-body-style
  const mySchoolHandle = Meteor.subscribe('schools.mySchool');
  const myTeachersHandle = Meteor.subscribe('teachers.allMyTeachers');
  const myStudentsHandle = Meteor.subscribe('students.allMyStudents');
  return {
    loading: !(mySchoolHandle.ready() && myTeachersHandle.ready() && myStudentsHandle.ready()),
    mySchool: Schools.find({ schoolId: Meteor.userId() }).fetch(),
    myTeachers: Teachers.find({ schoolId: Meteor.userId() }).fetch(),
    myStudents: Students.find({ schoolId: Meteor.userId() }).fetch(),
  };
}, SchoolAdmin);
