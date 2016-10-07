/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
import { Mongo } from 'meteor/mongo';
// eslint-disable-next-line import/no-unresolved
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Assignments } from '../assignments/assignments.js';

class ClassesCollection extends Mongo.Collection {
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
    Assignments.remove({ classId: selector._id });
    return result;
  }
}

// eslint-disable-next-line import/prefer-default-export
export const Classes = new ClassesCollection('Classes');

// Deny all client-side updates since we will be using methods to manage this collection
Classes.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Classes.schema = new SimpleSchema({
  _id: { type: String, regEx: SimpleSchema.RegEx.Id },
  schoolId: { type: String, regEx: SimpleSchema.RegEx.Id },
  teacherId: { type: String, regEx: SimpleSchema.RegEx.Id },
  name: { type: String, max: 30 },
  description: { type: String, max: 150 },
  studentIds: { type: [String], defaultValue: [] },
  assignments: { type: Number, defaultValue: 0 },
});

Classes.attachSchema(Classes.schema);

Classes.publicFields = {
  schoolId: 1,
  teacherId: 1,
  name: 1,
  description: 1,
  studentIds: 1,
  assignments: 1,
};
