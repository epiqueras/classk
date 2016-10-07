/* eslint-disable import/no-extraneous-dependencies */
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Assignments } from '../../api/assignments/assignments.js';
import SchoolStatsPage from '../pages/SchoolStatsPage.jsx';

export default createContainer(() => { // eslint-disable-line arrow-body-style
  return {
    assignments: Assignments.find({ schoolId: Meteor.userId() }).fetch(),
  };
}, SchoolStatsPage);
