/* eslint-disable import/no-extraneous-dependencies */
import { Mongo } from 'meteor/mongo';
// eslint-disable-next-line import/no-unresolved
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

// eslint-disable-next-line import/prefer-default-export
export const LoginAttempts = new Mongo.Collection('LoginAttempts');

// Deny all client-side updates since we will be using methods to manage this collection
LoginAttempts.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

LoginAttempts.schema = new SimpleSchema({
  _id: { type: String, regEx: SimpleSchema.RegEx.Id },
  clientAddress: { type: String },
  unsuccessfulAttempts: { type: Number, defaultValue: 0 },
  lastFailAt: { type: Date, defaultValue: new Date(0) },
});

LoginAttempts.attachSchema(LoginAttempts.schema);

LoginAttempts.publicFields = {
  unsuccessfulAttempts: 1,
  lastFailAt: 1,
};
