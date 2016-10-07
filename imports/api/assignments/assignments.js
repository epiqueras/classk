/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
import { Mongo } from 'meteor/mongo';
// eslint-disable-next-line import/no-unresolved
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Questions } from '../questions/questions.js';

class AssignmentsCollection extends Mongo.Collection {
  insert(doc, callback) {
    const result = super.insert(doc, callback);
    return result;
  }
  update(selector, modifier) {
    const result = super.update(selector, modifier);
    return result;
  }
  remove(selector) {
    const result = super.remove(selector);
    Questions.remove({ assignmentId: selector._id });
    return result;
  }
}

// eslint-disable-next-line import/prefer-default-export
export const Assignments = new AssignmentsCollection('Assignments');

// Deny all client-side updates since we will be using methods to manage this collection
Assignments.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Assignments.schema = new SimpleSchema({
  _id: { type: String, regEx: SimpleSchema.RegEx.Id },
  schoolId: { type: String, regEx: SimpleSchema.RegEx.Id },
  teacherId: { type: String, regEx: SimpleSchema.RegEx.Id },
  classId: { type: String, regEx: SimpleSchema.RegEx.Id },
  className: { type: String },
  title: { type: String, max: 30 },
  text: { type: String, max: 100000 },
  dueDate: { type: Date },
  questions: { type: Number, defaultValue: 0 },
  unanswered: { type: Number, defaultValue: 0 },
});

Assignments.attachSchema(Assignments.schema);

Assignments.publicFields = {
  schoolId: 1,
  teacherId: 1,
  classId: 1,
  className: 1,
  title: 1,
  text: 1,
  dueDate: 1,
  questions: 1,
  unanswered: 1,
};
