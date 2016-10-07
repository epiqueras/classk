/* eslint-disable import/no-extraneous-dependencies */
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
// eslint-disable-next-line import/no-unresolved
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Assignments } from './assignments.js';
import { Teachers } from '../teachers/teachers.js';
import { Classes } from '../classes/classes.js';

export const insertNewAssignment = new ValidatedMethod({
  name: 'assignments.insertNewAssignment',
  validate: new SimpleSchema({
    title: { type: String, max: 30 },
    theClassId: { type: String, regEx: SimpleSchema.RegEx.Id },
    dueDate: { type: Date },
    textJson: { type: String, max: 100000 },
    textCount: { type: Number, max: 10000 },
  }).validator(),
  run({ title, theClassId, dueDate, textJson }) {
    const teacherObject = Teachers.findOne({ teacherId: this.userId });
    const classObject = Classes.findOne({ _id: theClassId, teacherId: this.userId });
    if (!teacherObject) {
      throw new Meteor.Error('assignments.insertNewAssignment.unauthorized',
        'You are not a teacher.');
    }
    if (!classObject) {
      throw new Meteor.Error('assignments.insertNewAssignment.unauthorized',
        'Class does not exist.');
    }
    const schoolId = teacherObject.schoolId;
    if (!Roles.userIsInRole(this.userId, 'teacher', schoolId)
      || classObject.teacherId !== teacherObject.teacherId) {
      throw new Meteor.Error('assignments.insertNewAssignment.unauthorized',
        'Only teachers may create assignments for their classes.');
    } else {
      Assignments.insert({
        schoolId,
        teacherId: this.userId,
        classId: theClassId,
        className: classObject.name,
        title,
        text: textJson,
        dueDate,
      });
      Teachers.update({ teacherId: this.userId }, { $inc: { assignmentsSet: 1 } });
      Classes.update({ _id: theClassId }, { $inc: { assignments: 1 } });
    }
  },
});

export const deleteAssignment = new ValidatedMethod({
  name: 'assignments.deleteAssignment',
  validate: new SimpleSchema({
    assignmentId: { type: String, regEx: SimpleSchema.RegEx.Id },
  }).validator(),
  run({ assignmentId }) {
    const teacherObject = Teachers.findOne({ teacherId: this.userId });
    const assignmentObject = Assignments.findOne({ _id: assignmentId, teacherId: this.userId });
    if (!teacherObject) {
      throw new Meteor.Error('assignments.deleteAssignment.unauthorized',
        'You are not a teacher.');
    }
    if (!assignmentObject) {
      throw new Meteor.Error('assignments.deleteAssignment.unauthorized',
        'Assignment does not exist.');
    }
    const schoolId = teacherObject.schoolId;
    if (!Roles.userIsInRole(this.userId, 'teacher', schoolId)
      || assignmentObject.teacherId !== teacherObject.teacherId) {
      throw new Meteor.Error('assignments.deleteAssignment.unauthorized',
        'Only teachers may delete assignments from their classes.');
    } else {
      Assignments.remove({ _id: assignmentId });
      Teachers.update({ teacherId: this.userId }, { $inc: { assignmentsSet: -1 } });
      Classes.update({ _id: assignmentObject.classId }, { $inc: { assignments: -1 } });
    }
  },
});

export const editAssignment = new ValidatedMethod({
  name: 'assignments.editAssignment',
  validate: new SimpleSchema({
    assignmentId: { type: String, regEx: SimpleSchema.RegEx.Id },
    textJson: { type: String, max: 100000 },
    textCount: { type: Number, max: 10000 },
  }).validator(),
  run({ assignmentId, textJson }) {
    const teacherObject = Teachers.findOne({ teacherId: this.userId });
    const assignmentObject = Assignments.findOne({ _id: assignmentId, teacherId: this.userId });
    if (!teacherObject) {
      throw new Meteor.Error('assignments.editAssignment.unauthorized',
        'You are not a teacher.');
    }
    if (!assignmentObject) {
      throw new Meteor.Error('assignments.editAssignment.unauthorized',
        'Assignment does not exist.');
    }
    const schoolId = teacherObject.schoolId;
    if (!Roles.userIsInRole(this.userId, 'teacher', schoolId)
      || assignmentObject.teacherId !== teacherObject.teacherId) {
      throw new Meteor.Error('assignments.editAssignment.unauthorized',
        'Only teachers may edit their assignments.');
    } else {
      Assignments.update({ _id: assignmentId }, { $set: { text: textJson } });
    }
  },
});
