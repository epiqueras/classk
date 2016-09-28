/* eslint-disable import/no-extraneous-dependencies */
import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
// eslint-disable-next-line import/no-unresolved
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Classes } from './classes.js';


// export const insertNewAttempt = new ValidatedMethod({
//   name: 'loginAttempts.insertNewAttempt',
//   validate: new SimpleSchema({}).validator(),
//   run() {
//     if (Meteor.isServer) {
//       return LoginAttempts.insert({
//         clientAddress: this.connection.clientAddress,
//       });
//     }
//     return null;
//   },
// });
