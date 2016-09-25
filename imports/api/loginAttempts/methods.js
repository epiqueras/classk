/* eslint-disable import/no-extraneous-dependencies */
import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
// eslint-disable-next-line import/no-unresolved
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { LoginAttempts } from './loginAttempts.js';


export const insertNewAttempt = new ValidatedMethod({
  name: 'loginAttempts.insertNewAttempt',
  validate: new SimpleSchema({}).validator(),
  run() {
    if (Meteor.isServer) {
      return LoginAttempts.insert({
        clientAddress: this.connection.clientAddress,
      });
    }
    return null;
  },
});

export const increaseAttempts = new ValidatedMethod({
  name: 'loginAttempts.increaseAttempts',
  validate: new SimpleSchema({}).validator(),
  run() {
    if (Meteor.isServer) {
      return LoginAttempts.update(
        { clientAddress: this.connection.clientAddress },
        { $inc: { unsuccessfulAttempts: 1 } }
      );
    }
    return null;
  },
});

export const updateAttempts = new ValidatedMethod({
  name: 'loginAttempts.updateAttempts',
  validate: new SimpleSchema({}).validator(),
  run() {
    if (Meteor.isServer) {
      return LoginAttempts.update(
        { clientAddress: this.connection.clientAddress },
        { $set: { unsuccessfulAttempts: 0, lastFailAt: new Date() } }
      );
    }
    return null;
  },
});

export const removeAttempts = new ValidatedMethod({
  name: 'loginAttempts.removeAttempts',
  validate: new SimpleSchema({}).validator(),
  run() {
    if (Meteor.isServer) {
      return LoginAttempts.remove({ clientAddress: this.connection.clientAddress });
    }
    return null;
  },
});
