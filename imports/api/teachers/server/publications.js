/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prefer-arrow-callback */
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Teachers } from '../teachers.js';

Meteor.publish('teachers.allMyTeachers', function publishAllMyTeachers() {
  if (Roles.userIsInRole(this.userId, 'school-admin', this.userId)) {
    return Teachers.find({
      schoolId: this.userId,
    }, {
      fields: Teachers.publicFields,
    });
  }
  this.stop();
  return null;
});

Meteor.publish('teachers.myTeacherObject', function publishMyTeacherObject() {
  const teacherObject = Teachers.findOne({ teacherId: this.userId });
  if (!teacherObject) {
    this.stop();
    return null;
  }
  const schoolId = teacherObject.schoolId;
  if (Roles.userIsInRole(this.userId, 'teacher', schoolId)) {
    return Teachers.find({
      teacherId: this.userId,
    }, {
      fields: Teachers.publicFields,
    });
  }
  this.stop();
  return null;
});
