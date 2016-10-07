/* eslint-disable import/no-extraneous-dependencies */
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Schools } from '../../api/schools/schools.js';
import { Students } from '../../api/students/students.js';
import { Assignments } from '../../api/assignments/assignments.js';
import Student from '../layouts/Student.jsx';

export default createContainer(() => { // eslint-disable-line arrow-body-style
  const mySchoolHandle = Meteor.subscribe('schools.studentMySchool');
  const myStudentObjectHandle = Meteor.subscribe('students.myStudentObject');
  const myClassesHandle = Meteor.subscribe('classes.classesImIn');
  const myAssignmentsHandle = Meteor.subscribe('assignments.myAssignments');
  return {
    user: Meteor.user(),
    loading: !(myStudentObjectHandle.ready() && mySchoolHandle.ready()
      && myClassesHandle.ready() && myAssignmentsHandle.ready()),
    myColors: Schools.findOne({}, { fields: { colors: 1 } }),
    myStudentObject: Students.findOne({ studentId: Meteor.userId() }),
    assignments: Assignments.find({}).fetch(),
  };
}, Student);
