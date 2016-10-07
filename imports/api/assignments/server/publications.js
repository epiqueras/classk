/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-underscore-dangle */
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Teachers } from '../../teachers/teachers.js';
import { Students } from '../../students/students.js';
import { Classes } from '../../classes/classes.js';
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

Meteor.publish('assignments.myAssignments', function publishAssignmentsISet() {
  const studentObject = Students.findOne({ studentId: this.userId });
  let classesArray = Classes.find({ studentIds: this.userId });
  if (!classesArray) {
    this.stop();
    return null;
  }
  if (!studentObject) {
    this.stop();
    return null;
  }
  classesArray = classesArray.map(theClass => (
    theClass._id
  ));
  const schoolId = studentObject.schoolId;
  if (Roles.userIsInRole(this.userId, 'student', schoolId)) {
    return Assignments.find({
      classId: { $in: classesArray },
    }, {
      fields: Assignments.publicFields,
    });
  }
  this.stop();
  return null;
});

Meteor.publish('assignments.mySchoolAssignments', function publishAllMyAssignments() {
  return Assignments.find({
    schoolId: this.userId,
  }, {
    fields: Assignments.publicFields,
  });
});
