/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prefer-arrow-callback */
import { Meteor } from 'meteor/meteor';
import { LoginAttempts } from '../loginAttempts.js';

Meteor.publish('loginAttempts.public', function loginAttemptsPublic() {
  return LoginAttempts.find({
    clientAddress: this.connection.clientAdress,
  }, {
    fields: LoginAttempts.publicFields,
  });
});
