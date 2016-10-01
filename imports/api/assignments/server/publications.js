/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prefer-arrow-callback */
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Teachers } from '../../teachers/teachers.js';
import { Assignments } from '../assignments.js';

Meteor.publish('assignments.assignmentsISet', function publishAssignmentsISet() {
  const teacherObject = Teachers.findOne({ teacherId: this.userId });
  if (!teacherObject) {
    this.stop();
    return null;
  }
  const schoolId = teacherObject.schoolId;
  if (Roles.userIsInRole(this.userId, 'teacher', schoolId)) {
    return Assignments.find({
      teacherId: this.userId,
    }, {
      fields: Assignments.publicFields,
    });
  }
  this.stop();
  return null;
});
