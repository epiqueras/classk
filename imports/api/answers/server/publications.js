/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-underscore-dangle */
import { Meteor } from 'meteor/meteor';
// eslint-disable-next-line import/no-unresolved
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Roles } from 'meteor/alanning:roles';
import { Teachers } from '../../teachers/teachers.js';
import { Students } from '../../students/students.js';
import { Classes } from '../../classes/classes.js';
import { Questions } from '../../questions/questions.js';
import { Answers } from '../answers.js';

Meteor.publish('answers.answersInQuestion', function publishAnswersInQuestion(params) {
  new SimpleSchema({
    questionId: { type: String, regEx: SimpleSchema.RegEx.Id },
  }).validate(params);
  const questionObject = Questions.findOne({ _id: params.questionId });
  const teacherObject = Teachers.findOne({ teacherId: this.userId });
  const studentObject = Students.findOne({ studentId: this.userId });
  const theClassObject = Classes.findOne({ _id: questionObject.classId });
  if ((!teacherObject && !studentObject) || !questionObject) {
    this.stop();
    return null;
  }
  let schoolId;
  if (studentObject) { schoolId = studentObject.schoolId; }
  if (teacherObject) { schoolId = teacherObject.schoolId; }
  if (teacherObject && teacherObject.teacherId !== questionObject.teacherId) {
    this.stop();
    return null;
  }
  if (studentObject && !theClassObject.studentIds.includes(studentObject.studentId)) {
    this.stop();
    return null;
  }
  if (Roles.userIsInRole(this.userId, 'teacher', schoolId)
    || Roles.userIsInRole(this.userId, 'student', schoolId)) {
    return Answers.find({
      questionId: questionObject._id,
    }, {
      fields: Answers.publicFields,
    });
  }
  this.stop();
  return null;
});
