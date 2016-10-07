/* eslint-disable import/no-extraneous-dependencies */
import { createContainer } from 'meteor/react-meteor-data';
import { Assignments } from '../../api/assignments/assignments.js';
import StudentStatsPage from '../pages/StudentStatsPage.jsx';

export default createContainer(() => { // eslint-disable-line arrow-body-style
  return {
    assignments: Assignments.find({}).fetch(),
  };
}, StudentStatsPage);
