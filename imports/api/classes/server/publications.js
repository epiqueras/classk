/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prefer-arrow-callback */
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Teachers } from '../../teachers/teachers.js';
import { Classes } from '../classes.js';

Meteor.publish('classes.classesITeach', function publishMySchoolStudents() {
  const teacherObject = Teachers.findOne({ teacherId: this.userId });
  if (!teacherObject) {
    this.stop();
    return null;
  }
  const schoolId = teacherObject.schoolId;
  if (Roles.userIsInRole(this.userId, 'teacher', schoolId)) {
    return Classes.find({
      teacherId: this.userId,
    }, {
      fields: Classes.publicFields,
    });
  }
  this.stop();
  return null;
});