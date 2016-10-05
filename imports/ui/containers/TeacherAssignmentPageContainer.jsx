/* eslint-disable import/no-extraneous-dependencies */
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Assignments } from '../../api/assignments/assignments.js';
import { Questions } from '../../api/questions/questions.js';
import TeacherAssignmentPage from '../pages/TeacherAssignmentPage.jsx';

export default createContainer(({ params: { assignmentId } }) => {
  const myQuestionsHandle = Meteor.subscribe('questions.questionsInAssignment', { assignmentId });
  return {
    loading: !(myQuestionsHandle.ready()),
    assignment: Assignments.findOne({ _id: assignmentId }),
    questions: Questions.find({ assignmentId }).fetch(),
  };
}, TeacherAssignmentPage);
