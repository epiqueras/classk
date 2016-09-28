/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prefer-arrow-callback */
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Students } from '../../students/students.js';
import { Teachers } from '../../teachers/teachers.js';

// Meteor.publish('students.allMyStudents', function publishAllMyStudents() {
//   if (Roles.userIsInRole(this.userId, 'school-admin', this.userId)) {
//     return Students.find({
//       schoolId: this.userId,
//     }, {
//       fields: Students.publicFields,
//     });
//   }
//   this.stop();
//   return null;
// });

// Meteor.publish('students.mySchoolStudents', function publishMySchoolStudents() {
//   const teacherObject = Teachers.findOne({ teacherId: this.userId });
//   if (!teacherObject) {
//     this.stop();
//     return null;
//   }
//   const schoolId = teacherObject.schoolId;
//   if (Roles.userIsInRole(this.userId, 'teacher', schoolId)) {
//     return Students.find({
//       schoolId: schoolId,
//     }, {
//       fields: Students.publicFields,
//     });
//   }
//   this.stop();
//   return null;
// });
