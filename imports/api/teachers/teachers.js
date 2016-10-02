/* eslint-disable import/no-extraneous-dependencies */
import { Mongo } from 'meteor/mongo';
// eslint-disable-next-line import/no-unresolved
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

// eslint-disable-next-line import/prefer-default-export
export const Teachers = new Mongo.Collection('Teachers');

// Deny all client-side updates since we will be using methods to manage this collection
Teachers.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Teachers.schema = new SimpleSchema({
  _id: { type: String, regEx: SimpleSchema.RegEx.Id },
  md5hash: { type: String },
  schoolId: { type: String, regEx: SimpleSchema.RegEx.Id },
  teacherId: { type: String, regEx: SimpleSchema.RegEx.Id },
  firstName: { type: String, max: 30 },
  lastName: { type: String, max: 30 },
  assignmentsSet: { type: Number, defaultValue: 0 },
  answers: { type: Number, defaultValue: 0 },
  createdAt: { type: Date, defaultValue: new Date() },
});

Teachers.attachSchema(Teachers.schema);

// This represents the keys from Lists objects that should be published
// to the client. If we add secret properties to List objects, don't list
// them here to keep them private to the server.
Teachers.publicFields = {
  md5hash: 1,
  schoolId: 1,
  teacherId: 1,
  firstName: 1,
  lastName: 1,
  assignmentsSet: 1,
  answers: 1,
};
