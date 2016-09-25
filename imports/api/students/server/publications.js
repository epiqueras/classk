/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prefer-arrow-callback */
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Students } from '../students.js';

Meteor.publish('students.allMyStudents', function publishAllMyStudents() {
  if (Roles.userIsInRole(this.userId, 'school-admin', this.userId)) {
    return Students.find({
      schoolId: this.userId,
    }, {
      fields: Students.publicFields,
    });
  }
  this.stop();
  return null;
});
