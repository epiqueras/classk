/* eslint-disable import/no-extraneous-dependencies */
import { Mongo } from 'meteor/mongo';
// eslint-disable-next-line import/no-unresolved
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

// eslint-disable-next-line import/prefer-default-export
export const Answers = new Mongo.Collection('Answers');

// Deny all client-side updates since we will be using methods to manage this collection
Answers.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Answers.schema = new SimpleSchema({
  _id: { type: String, regEx: SimpleSchema.RegEx.Id },
  schoolId: { type: String, regEx: SimpleSchema.RegEx.Id },
  teacherId: { type: String, regEx: SimpleSchema.RegEx.Id },
  classId: { type: String, regEx: SimpleSchema.RegEx.Id },
  assignmentId: { type: String, regEx: SimpleSchema.RegEx.Id },
  questionId: { type: String, regEx: SimpleSchema.RegEx.Id },
  creatorId: { type: String, regEx: SimpleSchema.RegEx.Id },
  creatorName: { type: String, max: 30 },
  title: { type: String, max: 30 },
  text: { type: String, max: 100000 },
  createdAt: { type: Date, defaultValue: new Date() },
  accepted: { type: Boolean, defaultValue: false },
});

Answers.attachSchema(Answers.schema);

Answers.publicFields = {
  schoolId: 1,
  teacherId: 1,
  classId: 1,
  assignmentId: 1,
  questionId: 1,
  creatorId: 1,
  creatorName: 1,
  title: 1,
  text: 1,
  createdAt: 1,
  accepted: 1,
};
