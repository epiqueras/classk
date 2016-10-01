/* eslint-disable import/no-extraneous-dependencies */
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Assignments } from '../../api/assignments/assignments.js';
import { Classes } from '../../api/classes/classes.js';
import TeacherAssignmentsPage from '../pages/TeacherAssignmentsPage.jsx';

export default createContainer(({ params: { classId } }) => {
  const myAssignmentsHandle = Meteor.subscribe('assignments.assignmentsISet');
  const myClassesHandle = Meteor.subscribe('classes.classesITeach');
  return {
    user: Meteor.user(),
    loading: !(myAssignmentsHandle.ready() && myClassesHandle.ready()),
    myAssignments: Assignments.find({ teacherId: Meteor.userId() }).fetch(),
    myClasses: Classes.find({ teacherId: Meteor.userId() }).fetch(),
    classId,
  };
}, TeacherAssignmentsPage);
