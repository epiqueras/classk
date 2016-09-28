/* eslint-disable import/no-extraneous-dependencies */
import { Mongo } from 'meteor/mongo';
// eslint-disable-next-line import/no-unresolved
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

// eslint-disable-next-line import/prefer-default-export
export const Classes = new Mongo.Collection('Classes');

// Deny all client-side updates since we will be using methods to manage this collection
Classes.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

const StudentSchema = new SimpleSchema({
  studentId: { type: String, regEx: SimpleSchema.RegEx.Id },
  firstName: { type: String },
  lastName: { type: String },
});

Classes.schema = new SimpleSchema({
  _id: { type: String, regEx: SimpleSchema.RegEx.Id },
  name: { type: String },
  description: { type: String },
  students: { type: [StudentSchema] },
});

Classes.attachSchema(Classes.schema);

// This represents the keys from Lists objects that should be published
// to the client. If we add secret properties to List objects, don't list
// them here to keep them private to the server.
Classes.publicFields = {
  name: 1,
  description: 1,
  students: 1,
};
