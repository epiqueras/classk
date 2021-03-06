/* eslint-disable import/no-extraneous-dependencies */
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Classes } from '../../api/classes/classes.js';
import { Assignments } from '../../api/assignments/assignments.js';
import TeacherClassesPage from '../pages/TeacherClassesPage.jsx';

export default createContainer(() => { // eslint-disable-line arrow-body-style
  return {
    assignments: Assignments.find({ teacherId: Meteor.userId() }).fetch(),
    myClasses: Classes.find({ teacherId: Meteor.userId() }).fetch(),
  };
}, TeacherClassesPage);
