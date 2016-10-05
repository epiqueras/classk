/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-underscore-dangle */
import { Meteor } from 'meteor/meteor';
// eslint-disable-next-line import/no-unresolved
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Roles } from 'meteor/alanning:roles';
import { Teachers } from '../../teachers/teachers.js';
import { Students } from '../../students/students.js';
import { Assignments } from '../../assignments/assignments.js';
import { Questions } from '../questions.js';

Meteor.publish('questions.questionsInAssignment', function publishQuestionsInAssignment(params) {
  new SimpleSchema({
    assignmentId: { type: String, regEx: SimpleSchema.RegEx.Id },
  }).validate(params);
  const assignmentObject = Assignments.findOne({ _id: params.assignmentId });
  const teacherObject = Teachers.findOne({ teacherId: this.userId });
  const studentObject = Students.findOne({ studentId: this.userId });
  if ((!teacherObject && !studentObject) || !assignmentObject) {
    this.stop();
    return null;
  }
  let schoolId;
  if (studentObject) { schoolId = studentObject.schoolId; }
  if (teacherObject) { schoolId = teacherObject.schoolId; }
  if (Roles.userIsInRole(this.userId, 'teacher', schoolId)
    || Roles.userIsInRole(this.userId, 'student', schoolId)) {
    return Questions.find({
      assignmentId: assignmentObject._id,
    }, {
      fields: Questions.publicFields,
    });
  }
  this.stop();
  return null;
});
