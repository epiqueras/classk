/* eslint-disable import/no-extraneous-dependencies */
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Classes } from '../../api/classes/classes.js';
import { Students } from '../../api/students/students.js';
import { Assignments } from '../../api/assignments/assignments.js';
import StudentClassesPage from '../pages/StudentClassesPage.jsx';

export default createContainer(() => { // eslint-disable-line arrow-body-style
  const myClassmatesHandle = Meteor.subscribe('students.myClassmates');
  return {
    loading: !(myClassmatesHandle.ready()),
    myClassmates: Students.find({}).fetch(),
    assignments: Assignments.find({}).fetch(),
    myClasses: Classes.find({ studentIds: Meteor.userId() }).fetch(),
  };
}, StudentClassesPage);
