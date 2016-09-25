/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prefer-arrow-callback */
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Teachers } from '../teachers.js';

Meteor.publish('teachers.allMyTeachers', function teachersPublic() {
  if (Roles.userIsInRole(this.userId, 'school-admin', this.userId)) {
    return Teachers.find({
      schoolId: this.userId,
    }, {
      fields: Teachers.publicFields,
    });
  }
  return null;
});
