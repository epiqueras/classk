/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prefer-arrow-callback */
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Schools } from '../schools.js';
import { Teachers } from '../../teachers/teachers.js';

Meteor.publish('schools.mySchool', function publishAllMySchools() {
  return Schools.find({
    schoolId: this.userId,
  }, {
    fields: Schools.publicFields,
  });
});

Meteor.publish('schools.teacherMySchool', function publishAllMySchools() {
  const teacherObject = Teachers.findOne({ teacherId: this.userId });
  if (!teacherObject) {
    this.stop();
    return null;
  }
  const schoolId = teacherObject.schoolId;
  if (Roles.userIsInRole(this.userId, 'teacher', schoolId)) {
    return Schools.find({
      schoolId,
    }, {
      fields: Schools.publicFields,
    });
  }
  this.stop();
  return null;
});
