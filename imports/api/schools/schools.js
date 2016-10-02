/* eslint-disable import/no-extraneous-dependencies */
import { Mongo } from 'meteor/mongo';
// eslint-disable-next-line import/no-unresolved
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

// eslint-disable-next-line import/prefer-default-export
export const Schools = new Mongo.Collection('Schools');

// Deny all client-side updates since we will be using methods to manage this collection
Schools.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Schools.schema = new SimpleSchema({
  _id: { type: String, regEx: SimpleSchema.RegEx.Id },
  schoolId: { type: String, regEx: SimpleSchema.RegEx.Id },
  schoolName: { type: String, max: 30 },
  createdAt: { type: Date, defaultValue: new Date() },
});

Schools.attachSchema(Schools.schema);

// This represents the keys from Lists objects that should be published
// to the client. If we add secret properties to List objects, don't list
// them here to keep them private to the server.
Schools.publicFields = {
  schoolId: 1,
  schoolName: 1,
  createdAt: 1,
};
