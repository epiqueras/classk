/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prefer-arrow-callback */
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Students } from '../students.js';

Meteor.publish('students.allMyTeachers', function schoolsPublic() {
  if (Roles.userIsInRole(this.userId, 'school-admin', this.userId)) {
    return Students.find({
      schoolId: this.userId,
    }, {
      fields: Students.publicFields,
    });
  }
  return null;
});
