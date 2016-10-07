/* eslint-disable import/no-extraneous-dependencies */
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Assignments } from '../../api/assignments/assignments.js';
import TeacherStatsPage from '../pages/TeacherStatsPage.jsx';

export default createContainer(() => { // eslint-disable-line arrow-body-style
  return {
    assignments: Assignments.find({ teacherId: Meteor.userId() }).fetch(),
  };
}, TeacherStatsPage);
