/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
// eslint-disable-next-line import/no-unresolved
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Answers } from './answers.js';
import { Assignments } from '../assignments/assignments.js';
import { Teachers } from '../teachers/teachers.js';
import { Students } from '../students/students.js';
import { Classes } from '../classes/classes.js';
import { Questions } from '../questions/questions.js';

export const insertNewAnswer = new ValidatedMethod({
  name: 'answer.insertNewAnswer',
  validate: new SimpleSchema({
    title: { type: String, max: 30 },
    questionId: { type: String, regEx: SimpleSchema.RegEx.Id },
    textJson: { type: String, max: 100000 },
    textCount: { type: Number, max: 10000 },
  }).validator(),
  run({ title, questionId, textJson }) {
    const teacherObject = Teachers.findOne({ teacherId: this.userId });
    const studentObject = Students.findOne({ studentId: this.userId });
    const questionObject = Questions.findOne({ _id: questionId });
    const theClassObject = Classes.findOne({ _id: questionObject.classId });
    if (!teacherObject && !studentObject) {
      throw new Meteor.Error('answer.insertNewAnswer.unauthorized',
        'You are not a student or teacher.');
    }
    if (!questionObject) {
      throw new Meteor.Error('answer.insertNewAnswer.unauthorized',
        'Question does not exist.');
    }
    if (!theClassObject) {
      throw new Meteor.Error('answer.insertNewAnswer.unauthorized',
        'Class does not exist.');
    }
    const schoolId = teacherObject ? teacherObject.schoolId : studentObject.schoolId;
    const creatorName = teacherObject ?
      `${teacherObject.firstName} ${teacherObject.lastName}` :
      `${studentObject.firstName} ${studentObject.lastName}`;
    if (teacherObject && teacherObject.teacherId !== questionObject.teacherId) {
      throw new Meteor.Error('answer.insertNewAnswer.unauthorized',
        'You are not part of this question.');
    }
    if (studentObject && !theClassObject.studentIds.includes(studentObject.studentId)) {
      throw new Meteor.Error('answer.insertNewAnswer.unauthorized',
        'You are not part of this question.');
    }
    if (this.userId === questionObject.creatorId) {
      throw new Meteor.Error('answer.insertNewAnswer.unauthorized',
        'You cannot answer your own question.');
    }
    if (Roles.userIsInRole(this.userId, 'teacher', schoolId)
      || Roles.userIsInRole(this.userId, 'student', schoolId)) {
      Answers.insert({
        schoolId,
        teacherId: questionObject.teacherId,
        classId: questionObject.classId,
        assignmentId: questionObject.assignmentId,
        questionId: questionObject._id,
        className: theClassObject.name,
        creatorId: this.userId,
        creatorName,
        title,
        text: textJson,
      });
      Questions.update({ _id: questionId }, { $inc: { answers: 1 } });
      if (studentObject) {
        Students.update({ studentId: this.userId }, { $inc: { answers: 1 } });
      } else if (teacherObject) {
        Teachers.update({ teacherId: this.userId }, { $inc: { answers: 1 } });
      }
    } else {
      throw new Meteor.Error('answer.insertNewAnswer.unauthorized',
        'Only teachers and students may answer questions.');
    }
  },
});

export const acceptAnswer = new ValidatedMethod({
  name: 'answer.acceptAnswer',
  validate: new SimpleSchema({
    answerId: { type: String, regEx: SimpleSchema.RegEx.Id },
  }).validator(),
  run({ answerId }) {
    const teacherObject = Teachers.findOne({ teacherId: this.userId });
    const studentObject = Students.findOne({ studentId: this.userId });
    const answerObject = Answers.findOne({ _id: answerId });
    const questionObject = Questions.findOne({ _id: answerObject.questionId });
    if (!teacherObject && !studentObject) {
      throw new Meteor.Error('answer.acceptAnswer.unauthorized',
        'You are not a student or teacher.');
    }
    if (!answerObject) {
      throw new Meteor.Error('answer.acceptAnswer.unauthorized',
        'Answer does not exist.');
    }
    if (!questionObject) {
      throw new Meteor.Error('answer.acceptAnswer.unauthorized',
        'Question does not exist.');
    }
    const schoolId = teacherObject ? teacherObject.schoolId : studentObject.schoolId;
    if (teacherObject && teacherObject.teacherId !== questionObject.creatorId) {
      throw new Meteor.Error('answer.acceptAnswer.unauthorized',
        'You did not ask this question.');
    }
    if (studentObject && studentObject.studentId !== questionObject.creatorId) {
      throw new Meteor.Error('answer.acceptAnswer.unauthorized',
        'You did not ask this question.');
    }
    if (answerObject.accepted || questionObject.answered) {
      throw new Meteor.Error('answer.unacceptAnswer.unauthorized',
        'Answer is already accepted.');
    }
    if (Roles.userIsInRole(this.userId, 'teacher', schoolId)
      || Roles.userIsInRole(this.userId, 'student', schoolId)) {
      Answers.update({ _id: answerId }, { $set: { accepted: true } });
      Questions.update({ _id: questionObject._id }, { $set: { answered: true } });
      Assignments.update({ _id: questionObject.assignmentId }, { $inc: { unanswered: -1 } });
      if (studentObject) {
        Students.update({ studentId: answerObject.creatorId }, { $inc: { acceptedAnswers: 1 } });
      } else if (teacherObject) {
        Teachers.update({ teacherId: answerObject.creatorId }, { $inc: { acceptedAnswers: 1 } });
      }
    } else {
      throw new Meteor.Error('answer.acceptAnswer.unauthorized',
        'Only teachers and students may accept answers.');
    }
  },
});

export const unacceptAnswer = new ValidatedMethod({
  name: 'answer.unacceptAnswer',
  validate: new SimpleSchema({
    answerId: { type: String, regEx: SimpleSchema.RegEx.Id },
  }).validator(),
  run({ answerId }) {
    const teacherObject = Teachers.findOne({ teacherId: this.userId });
    const studentObject = Students.findOne({ studentId: this.userId });
    const answerObject = Answers.findOne({ _id: answerId });
    const questionObject = Questions.findOne({ _id: answerObject.questionId });
    if (!teacherObject && !studentObject) {
      throw new Meteor.Error('answer.unacceptAnswer.unauthorized',
        'You are not a student or teacher.');
    }
    if (!answerObject) {
      throw new Meteor.Error('answer.unacceptAnswer.unauthorized',
        'Answer does not exist.');
    }
    if (!questionObject) {
      throw new Meteor.Error('answer.unacceptAnswer.unauthorized',
        'Question does not exist.');
    }
    const schoolId = teacherObject ? teacherObject.schoolId : studentObject.schoolId;
    if (teacherObject && teacherObject.teacherId !== questionObject.creatorId) {
      throw new Meteor.Error('answer.unacceptAnswer.unauthorized',
        'You did not ask this question.');
    }
    if (studentObject && studentObject.studentId !== questionObject.creatorId) {
      throw new Meteor.Error('answer.unacceptAnswer.unauthorized',
        'You did not ask this question.');
    }
    if (!answerObject.accepted || !questionObject.answered) {
      throw new Meteor.Error('answer.unacceptAnswer.unauthorized',
        'Answer is not accepted.');
    }
    if (Roles.userIsInRole(this.userId, 'teacher', schoolId)
      || Roles.userIsInRole(this.userId, 'student', schoolId)) {
      Answers.update({ _id: answerId }, { $set: { accepted: false } });
      Questions.update({ _id: questionObject._id }, { $set: { answered: false } });
      Assignments.update({ _id: questionObject.assignmentId }, { $inc: { unanswered: 1 } });
      if (studentObject) {
        Students.update({ studentId: answerObject.creatorId }, { $inc: { acceptedAnswers: -1 } });
      } else if (teacherObject) {
        Teachers.update({ teacherId: answerObject.creatorId }, { $inc: { acceptedAnswers: -1 } });
      }
    } else {
      throw new Meteor.Error('answer.unacceptAnswer.unauthorized',
        'Only teachers and students may accept answers.');
    }
  },
});

export const deleteAnswer = new ValidatedMethod({
  name: 'answer.deleteAnswer',
  validate: new SimpleSchema({
    answerId: { type: String, regEx: SimpleSchema.RegEx.Id },
  }).validator(),
  run({ answerId }) {
    const teacherObject = Teachers.findOne({ teacherId: this.userId });
    const studentObject = Students.findOne({ studentId: this.userId });
    const answerObject = Answers.findOne({ _id: answerId });
    if (!teacherObject && !studentObject) {
      throw new Meteor.Error('answer.deleteAnswer.unauthorized',
        'You are not a student or teacher.');
    }
    if (!answerObject) {
      throw new Meteor.Error('answer.deleteAnswer.unauthorized',
        'Answer does not exist.');
    }
    const schoolId = teacherObject ? teacherObject.schoolId : studentObject.schoolId;
    if (teacherObject && teacherObject.teacherId !== answerObject.creatorId) {
      throw new Meteor.Error('answer.deleteAnswer.unauthorized',
        'This is not your answer.');
    }
    if (studentObject && studentObject.studentId !== answerObject.creatorId) {
      throw new Meteor.Error('answer.deleteAnswer.unauthorized',
        'This is not your answer.');
    }
    if (Roles.userIsInRole(this.userId, 'teacher', schoolId)
      || Roles.userIsInRole(this.userId, 'student', schoolId)) {
      Answers.remove({ _id: answerId });
      if (answerObject.accepted) {
        Questions.update({ _id: answerObject.questionId }, { $set: { answered: false } });
        Assignments.update({ _id: answerObject.assignmentId }, { $inc: { unanswered: 1 } });
        if (studentObject) {
          Students.update({ studentId: answerObject.creatorId }, { $inc: { acceptedAnswers: -1 } });
        } else if (teacherObject) {
          Teachers.update({ teacherId: answerObject.creatorId }, { $inc: { acceptedAnswers: -1 } });
        }
      }
      Questions.update({ _id: answerObject.questionId }, { $inc: { answers: -1 } });
      if (studentObject) {
        Students.update({ studentId: answerObject.creatorId }, { $inc: { answers: -1 } });
      } else if (teacherObject) {
        Teachers.update({ teacherId: answerObject.creatorId }, { $inc: { answers: -1 } });
      }
    } else {
      throw new Meteor.Error('answer.deleteAnswer.unauthorized',
        'Only teachers and students may delete answers.');
    }
  },
});

export const editAnswer = new ValidatedMethod({
  name: 'answer.editAnswer',
  validate: new SimpleSchema({
    answerId: { type: String, regEx: SimpleSchema.RegEx.Id },
    textJson: { type: String, max: 100000 },
    textCount: { type: Number, max: 10000 },
  }).validator(),
  run({ answerId, textJson }) {
    const teacherObject = Teachers.findOne({ teacherId: this.userId });
    const studentObject = Students.findOne({ studentId: this.userId });
    const answerObject = Answers.findOne({ _id: answerId });
    if (!teacherObject && !studentObject) {
      throw new Meteor.Error('answer.editAnswer.unauthorized',
        'You are not a student or teacher.');
    }
    if (!answerObject) {
      throw new Meteor.Error('answer.editAnswer.unauthorized',
        'Answer does not exist.');
    }
    const schoolId = teacherObject ? teacherObject.schoolId : studentObject.schoolId;
    if (teacherObject && teacherObject.teacherId !== answerObject.creatorId) {
      throw new Meteor.Error('answer.editAnswer.unauthorized',
        'This is not your answer.');
    }
    if (studentObject && studentObject.studentId !== answerObject.creatorId) {
      throw new Meteor.Error('answer.editAnswer.unauthorized',
        'This is not your answer.');
    }
    if (Roles.userIsInRole(this.userId, 'teacher', schoolId)
      || Roles.userIsInRole(this.userId, 'student', schoolId)) {
      Answers.update({ _id: answerId }, { $set: { text: textJson } });
    } else {
      throw new Meteor.Error('answer.deleteAnswer.unauthorized',
        'Only teachers and students may edit answers.');
    }
  },
});
