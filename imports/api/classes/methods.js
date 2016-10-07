/* eslint-disable import/no-extraneous-dependencies */
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
// eslint-disable-next-line import/no-unresolved
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Classes } from './classes.js';
import { Teachers } from '../teachers/teachers.js';
import { Assignments } from '../assignments/assignments.js';

export const insertNewClass = new ValidatedMethod({
  name: 'classes.insertNewClass',
  validate: new SimpleSchema({
    name: { type: String, max: 30 },
    description: { type: String, max: 150 },
  }).validator(),
  run({ name, description }) {
    const teacherObject = Teachers.findOne({ teacherId: this.userId });
    if (!teacherObject) {
      throw new Meteor.Error('classes.insertNewClass.unauthorized',
        'You are not a teacher.');
    }
    const schoolId = teacherObject.schoolId;
    if (!Roles.userIsInRole(this.userId, 'teacher', schoolId)) {
      throw new Meteor.Error('classes.insertNewClass.unauthorized',
        'Only teachers may create classes.');
    } else {
      Classes.insert({
        schoolId,
        teacherId: this.userId,
        name,
        description,
      });
    }
  },
});

export const addToClass = new ValidatedMethod({
  name: 'classes.addToClass',
  validate: new SimpleSchema({
    theClassId: { type: String, regEx: SimpleSchema.RegEx.Id },
    studentId: { type: String, regEx: SimpleSchema.RegEx.Id },
  }).validator(),
  run({ theClassId, studentId }) {
    const teacherObject = Teachers.findOne({ teacherId: this.userId });
    const classObject = Classes.findOne({ _id: theClassId, teacherId: this.userId });
    if (!teacherObject) {
      throw new Meteor.Error('classes.addToClass.unauthorized',
        'You are not a teacher.');
    }
    if (!classObject) {
      throw new Meteor.Error('classes.addToClass.unauthorized',
        'Class does not exist.');
    }
    const schoolId = teacherObject.schoolId;
    if (!Roles.userIsInRole(this.userId, 'teacher', schoolId)
      || classObject.teacherId !== teacherObject.teacherId) {
      throw new Meteor.Error('classes.addToClass.unauthorized',
        'Only teachers may add students to their classes.');
    } else if (classObject.studentIds.includes(studentId)) {
      throw new Meteor.Error('classes.addToClass.unauthorized',
        'Student is already in this class.');
    } else {
      Classes.update({ _id: theClassId }, { $push: { studentIds: studentId } });
    }
  },
});

export const removeFromClass = new ValidatedMethod({
  name: 'classes.removeFromClass',
  validate: new SimpleSchema({
    theClassId: { type: String, regEx: SimpleSchema.RegEx.Id },
    studentId: { type: String, regEx: SimpleSchema.RegEx.Id },
  }).validator(),
  run({ theClassId, studentId }) {
    const teacherObject = Teachers.findOne({ teacherId: this.userId });
    const classObject = Classes.findOne({ _id: theClassId, teacherId: this.userId });
    if (!teacherObject) {
      throw new Meteor.Error('classes.removeFromClass.unauthorized',
        'You are not a teacher.');
    }
    if (!classObject) {
      throw new Meteor.Error('classes.removeFromClass.unauthorized',
        'Class does not exist.');
    }
    const schoolId = teacherObject.schoolId;
    if (!Roles.userIsInRole(this.userId, 'teacher', schoolId)
      || classObject.teacherId !== teacherObject.teacherId) {
      throw new Meteor.Error('classes.removeFromClass.unauthorized',
        'Only teachers may remove students from their classes.');
    } else if (!classObject.studentIds.includes(studentId)) {
      throw new Meteor.Error('classes.removeFromClass.unauthorized',
        'Student is not in this class.');
    } else {
      Classes.update({ _id: theClassId }, { $pull: { studentIds: studentId } });
    }
  },
});

export const deleteClass = new ValidatedMethod({
  name: 'classes.deleteClass',
  validate: new SimpleSchema({
    theClassId: { type: String, regEx: SimpleSchema.RegEx.Id },
  }).validator(),
  run({ theClassId }) {
    const teacherObject = Teachers.findOne({ teacherId: this.userId });
    const classObject = Classes.findOne({ _id: theClassId, teacherId: this.userId });
    if (!teacherObject) {
      throw new Meteor.Error('classes.deleteClass.unauthorized',
        'You are not a teacher.');
    }
    if (!classObject) {
      throw new Meteor.Error('classes.deleteClass.unauthorized',
        'Class does not exist.');
    }
    const schoolId = teacherObject.schoolId;
    if (!Roles.userIsInRole(this.userId, 'teacher', schoolId)
      || classObject.teacherId !== teacherObject.teacherId) {
      throw new Meteor.Error('classes.deleteClass.unauthorized',
        'Only teachers may delete their classes.');
    } else {
      Classes.remove({ _id: theClassId });
      const assignmentsLeft = Assignments.find({ teacherId: this.userId }).count();
      Teachers.update({ teacherId: this.userId }, { $set: { assignmentsSet: assignmentsLeft } });
    }
  },
});
