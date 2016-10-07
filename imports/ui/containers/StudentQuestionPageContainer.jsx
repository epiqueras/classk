/* eslint-disable import/no-extraneous-dependencies */
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Questions } from '../../api/questions/questions.js';
import { Answers } from '../../api/answers/answers.js';
import StudentQuestionPage from '../pages/StudentQuestionPage.jsx';

export default createContainer(({ params: { questionId } }) => {
  const myAnswersHandle = Meteor.subscribe('answers.answersInQuestion', { questionId });
  return {
    loading: !(myAnswersHandle.ready()),
    question: Questions.findOne({ _id: questionId }),
    answers: Answers.find({ questionId }).fetch(),
  };
}, StudentQuestionPage);
