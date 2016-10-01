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
  name: 'classes.insertNewAssignment',
  validate: new SimpleSchema({
    title: { type: String },
    theClassId: { type: String },
    dueDate: { type: Date },
    textJson: { type: String },
  }).validator(),
  run({ title, theClassId, dueDate, textJson }) {
    const teacherObject = Teachers.findOne({ teacherId: this.userId });
    const classObject = Classes.findOne({ _id: theClassId, teacherId: this.userId });
    if (!teacherObject) {
      throw new Meteor.Error('classes.insertNewAssignment.unauthorized',
        'You are not a teacher.');
    }
    if (!classObject) {
      throw new Meteor.Error('classes.insertNewAssignment.unauthorized',
        'Class does not exist.');
    }
    const schoolId = teacherObject.schoolId;
    if (!Roles.userIsInRole(this.userId, 'teacher', schoolId)
      || classObject.teacherId !== teacherObject.teacherId) {
      throw new Meteor.Error('utility.insertNewAssignment.unauthorized',
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
    }
  },
});
