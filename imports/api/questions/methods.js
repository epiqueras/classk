/* eslint-disable import/no-extraneous-dependencies */
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
// eslint-disable-next-line import/no-unresolved
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Assignments } from '../assignments/assignments.js';
import { Teachers } from '../teachers/teachers.js';
import { Students } from '../students/students.js';
import { Classes } from '../classes/classes.js';
import { Questions } from './questions.js';

export const insertNewQuestion = new ValidatedMethod({
  name: 'questions.insertNewQuestion',
  validate: new SimpleSchema({
    title: { type: String, max: 30 },
    assignmentId: { type: String, regEx: SimpleSchema.RegEx.Id },
    textJson: { type: String, max: 100000 },
    textCount: { type: Number, max: 10000 },
  }).validator(),
  run({ title, assignmentId, textJson }) {
    const teacherObject = Teachers.findOne({ teacherId: this.userId });
    const studentObject = Students.findOne({ studentId: this.userId });
    const assignmentObject = Assignments.findOne({ _id: assignmentId });
    const theClassObject = Classes.findOne({ _id: assignmentObject.classId });
    if (!teacherObject && !studentObject) {
      throw new Meteor.Error('questions.insertNewQuestion.unauthorized',
        'You are not a student or teacher.');
    }
    if (!assignmentObject) {
      throw new Meteor.Error('questions.insertNewQuestion.unauthorized',
        'Assignment does not exist.');
    }
    if (!theClassObject) {
      throw new Meteor.Error('questions.insertNewQuestion.unauthorized',
        'Class does not exist.');
    }
    const schoolId = teacherObject ? teacherObject.schoolId : studentObject.schoolId;
    const creatorName = teacherObject ?
      `${teacherObject.firstName} ${teacherObject.lastName}` :
      `${studentObject.firstName} ${studentObject.lastName}`;
    if (teacherObject && teacherObject.teacherId !== assignmentObject.teacherId) {
      throw new Meteor.Error('questions.insertNewQuestion.unauthorized',
        'You are not part of this assignment.');
    }
    if (studentObject && !theClassObject.studentIds.includes(studentObject.studentId)) {
      throw new Meteor.Error('questions.insertNewQuestion.unauthorized',
        'You are not part of this assignment.');
    }
    if (Roles.userIsInRole(this.userId, 'teacher', schoolId)
      || Roles.userIsInRole(this.userId, 'student', schoolId)) {
      Questions.insert({
        schoolId,
        teacherId: assignmentObject.teacherId,
        classId: assignmentObject.classId,
        assignmentId,
        className: theClassObject.name,
        creatorId: this.userId,
        creatorName,
        title,
        text: textJson,
      });
      Assignments.update({ _id: assignmentId }, { $inc: { questions: 1, unanswered: 1 } });
      if (studentObject) {
        Students.update({ studentId: this.userId }, { $inc: { questions: 1 } });
      }
    } else {
      throw new Meteor.Error('questions.insertNewQuestion.unauthorized',
        'Only teachers and students may ask questions.');
    }
  },
});

export const editQuestion = new ValidatedMethod({
  name: 'questions.editQuestion',
  validate: new SimpleSchema({
    questionId: { type: String, regEx: SimpleSchema.RegEx.Id },
    textJson: { type: String, max: 100000 },
    textCount: { type: Number, max: 10000 },
  }).validator(),
  run({ questionId, textJson }) {
    const teacherObject = Teachers.findOne({ teacherId: this.userId });
    const studentObject = Students.findOne({ studentId: this.userId });
    const questionObject = Questions.findOne({ _id: questionId });
    if (!teacherObject && !studentObject) {
      throw new Meteor.Error('questions.editQuestion.unauthorized',
        'You are not a student or teacher.');
    }
    if (!questionObject) {
      throw new Meteor.Error('questions.editQuestion.unauthorized',
        'Question does not exist.');
    }
    const schoolId = teacherObject ? teacherObject.schoolId : studentObject.schoolId;
    if (teacherObject && teacherObject.teacherId !== questionObject.creatorId) {
      throw new Meteor.Error('questions.editQuestion.unauthorized',
        'You did not ask this question.');
    }
    if (studentObject && studentObject.studentId !== questionObject.creatorId) {
      throw new Meteor.Error('questions.editQuestion.unauthorized',
        'You did not ask this question.');
    }
    if (Roles.userIsInRole(this.userId, 'teacher', schoolId)
      || Roles.userIsInRole(this.userId, 'student', schoolId)) {
      Questions.update({ _id: questionId }, { $set: { text: textJson } });
    } else {
      throw new Meteor.Error('questions.editQuestion.unauthorized',
        'Only teachers and students may edit their questions.');
    }
  },
});

export const deleteQuestion = new ValidatedMethod({
  name: 'questions.deleteQuestion',
  validate: new SimpleSchema({
    questionId: { type: String, regEx: SimpleSchema.RegEx.Id },
  }).validator(),
  run({ questionId }) {
    const teacherObject = Teachers.findOne({ teacherId: this.userId });
    const studentObject = Students.findOne({ studentId: this.userId });
    const questionObject = Questions.findOne({ _id: questionId });
    if (!teacherObject && !studentObject) {
      throw new Meteor.Error('questions.deleteQuestion.unauthorized',
        'You are not a student or teacher.');
    }
    if (!questionObject) {
      throw new Meteor.Error('questions.deleteQuestion.unauthorized',
        'Question does not exist.');
    }
    const schoolId = teacherObject ? teacherObject.schoolId : studentObject.schoolId;
    if (teacherObject && teacherObject.teacherId !== questionObject.creatorId) {
      throw new Meteor.Error('questions.deleteQuestion.unauthorized',
        'You did not ask this question.');
    }
    if (studentObject && studentObject.studentId !== questionObject.creatorId) {
      throw new Meteor.Error('questions.deleteQuestion.unauthorized',
        'You did not ask this question.');
    }
    if (Roles.userIsInRole(this.userId, 'teacher', schoolId)
      || Roles.userIsInRole(this.userId, 'student', schoolId)) {
      Questions.remove({ _id: questionId });
      Assignments.update({ _id: questionObject.assignmentId }, { $inc: { questions: -1 } });
      if (!questionObject.answered) {
        Assignments.update({ _id: questionObject.assignmentId }, { $inc: { unanswered: -1 } });
      }
      if (studentObject) {
        Students.update({ studentId: this.userId }, { $inc: { questions: -1 } });
      }
    } else {
      throw new Meteor.Error('questions.deleteQuestion.unauthorized',
        'Only teachers and students may delete their questions.');
    }
  },
});
