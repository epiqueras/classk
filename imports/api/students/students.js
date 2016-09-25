/* eslint-disable import/no-extraneous-dependencies */
import { Mongo } from 'meteor/mongo';
// eslint-disable-next-line import/no-unresolved
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

// eslint-disable-next-line import/prefer-default-export
export const Students = new Mongo.Collection('Students');

// Deny all client-side updates since we will be using methods to manage this collection
Students.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Students.schema = new SimpleSchema({
  _id: { type: String, regEx: SimpleSchema.RegEx.Id },
  md5hash: { type: String },
  schoolId: { type: String, regEx: SimpleSchema.RegEx.Id },
  studentId: { type: String, regEx: SimpleSchema.RegEx.Id },
  firstName: { type: String },
  lastName: { type: String },
  grade: { type: String },
  questions: { type: Number, defaultValue: 0 },
  answers: { type: Number, defaultValue: 0 },
  acceptedAnswers: { type: Number, defaultValue: 0 },
  points: { type: Number, defaultValue: 0 },
  createdAt: { type: Date, defaultValue: new Date() },
});

Students.attachSchema(Students.schema);

// This represents the keys from Lists objects that should be published
// to the client. If we add secret properties to List objects, don't list
// them here to keep them private to the server.
Students.publicFields = {
  md5hash: 1,
  schoolId: 1,
  studentId: 1,
  firstName: 1,
  lastName: 1,
  questions: 1,
  answers: 1,
  acceptedAnswers: 1,
  points: 1,
};