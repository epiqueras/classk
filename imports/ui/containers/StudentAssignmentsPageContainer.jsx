/* eslint-disable import/no-extraneous-dependencies */
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Assignments } from '../../api/assignments/assignments.js';
import { Classes } from '../../api/classes/classes.js';
import StudentAssignmentsPage from '../pages/StudentAssignmentsPage.jsx';

export default createContainer(({ params: { classId } }) => {
  return {
    assignments: Assignments.find({}).fetch(),
    myClasses: Classes.find({ studentIds: Meteor.userId() }).fetch(),
    classId,
  };
}, StudentAssignmentsPage);
