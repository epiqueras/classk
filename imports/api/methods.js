/* eslint-disable import/no-extraneous-dependencies */
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Gravatar } from 'meteor/jparker:gravatar';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Roles } from 'meteor/alanning:roles';
// eslint-disable-next-line import/no-unresolved
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Schools } from './schools/schools.js';
import { Teachers } from './teachers/teachers.js';
import { Students } from './students/students.js';

export const getAppropiateRoute = new ValidatedMethod({
  name: 'utility.getAppropiateRoute',
  validate: new SimpleSchema({}).validator(),
  run() {
    // Not logged in.
    if (!this.userId) {
      console.log('not logged in');
      return '/';
    }

    // Hidden admin.
    if (Roles.userIsInRole(this.userId, 'hidden-admin', Roles.GLOBAL_GROUP)) {
      console.log('hidddeennnnnnn');
      return '/hidden-admin';
    }

    // School user.
    if (Roles.userIsInRole(this.userId, 'school-admin', this.userId)) {
      return '/school-admin';
    }

    const schoolId = Object.keys(Meteor.user().roles)[0];
    if (Roles.userIsInRole(this.userId, 'teacher', schoolId)) {
      return '/teacher';
    }

    console.log('unmet conditions');
    // return '/';
  },
});

export const createSchoolUser = new ValidatedMethod({
  name: 'utility.createSchoolUser',
  validate: new SimpleSchema({
    schoolName: { type: String },
    email: { type: String },
  }).validator(),
  run({ email, schoolName }) {
    if (Meteor.isServer) {
      // Not authorized.
      if (!this.userId || !Roles.userIsInRole(this.userId, 'hidden-admin', Roles.GLOBAL_GROUP)) {
        throw new Meteor.Error('utility.createSchoolUser.unauthorized',
          'Non admins may not create school users.');
      } else {
        const id = Accounts.createUser({
          email,
          profile: { name: schoolName },
        });
        Schools.insert({ schoolId: id, schoolName });
        Roles.addUsersToRoles(id, 'school-admin', id);
        Accounts.sendEnrollmentEmail(id);
      }
    }
  },
});

export const createTeacherUser = new ValidatedMethod({
  name: 'utility.createTeacherUser',
  validate: new SimpleSchema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
  }).validator(),
  run({ firstName, lastName, email }) {
    if (Meteor.isServer) {
      // Not authorized.
      if (!this.userId || !Roles.userIsInRole(this.userId, 'school-admin', this.userId)) {
        throw new Meteor.Error('utility.createTeacherUser.unauthorized',
          'Only Schools may create teacher accounts.');
      } else {
        const id = Accounts.createUser({
          email,
          profile: { name: `${firstName} ${lastName}` },
        });
        Teachers.insert({
          md5hash: Gravatar.hash(email),
          schoolId: this.userId,
          teacherId: id,
          firstName,
          lastName,
        });
        Roles.addUsersToRoles(id, 'teacher', this.userId);
        Accounts.sendEnrollmentEmail(id);
      }
    }
  },
});

export const deleteTeacherUser = new ValidatedMethod({
  name: 'utility.deleteTeacherUser',
  validate: new SimpleSchema({
    teacherId: { type: String },
  }).validator(),
  run({ teacherId }) {
    if (Meteor.isServer) {
      // Not authorized.
      if (!this.userId || !Roles.userIsInRole(this.userId, 'school-admin', this.userId)) {
        throw new Meteor.Error('utility.deleteTeacherUser.unauthorized',
          'Only Schools may delete teacher accounts.');
      } else {
        const teacherToDelete = Teachers.findOne({ teacherId });
        if (teacherToDelete.schoolId !== this.userId) {
          throw new Meteor.Error('utility.deleteTeacherUser.unauthorized',
          'Schools may only delete their own teachers.');
        } else {
          Roles.setUserRoles(teacherId, [], this.userId);
          Meteor.users.remove({ _id: teacherId });
          Teachers.remove({ teacherId });
        }
      }
    }
  },
});

export const createStudentUser = new ValidatedMethod({
  name: 'utility.createStudentUser',
  validate: new SimpleSchema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    grade: { type: String },
  }).validator(),
  run({ firstName, lastName, email, grade }) {
    if (Meteor.isServer) {
      // Not authorized.
      if (!this.userId || !Roles.userIsInRole(this.userId, 'school-admin', this.userId)) {
        throw new Meteor.Error('utility.createStudentUser.unauthorized',
          'Only Schools may create student accounts.');
      } else {
        const id = Accounts.createUser({
          email,
          profile: { name: `${firstName} ${lastName}` },
        });
        Students.insert({
          md5hash: Gravatar.hash(email),
          schoolId: this.userId,
          studentId: id,
          firstName,
          lastName,
          grade,
        });
        Roles.addUsersToRoles(id, 'student', this.userId);
        Accounts.sendEnrollmentEmail(id);
      }
    }
  },
});

export const deleteStudentUser = new ValidatedMethod({
  name: 'utility.deleteStudentUser',
  validate: new SimpleSchema({
    studentId: { type: String },
  }).validator(),
  run({ studentId }) {
    if (Meteor.isServer) {
      // Not authorized.
      if (!this.userId || !Roles.userIsInRole(this.userId, 'school-admin', this.userId)) {
        throw new Meteor.Error('utility.deleteStudentUser.unauthorized',
          'Only Schools may delete student accounts.');
      } else {
        const studentToDelete = Students.findOne({ studentId });
        if (studentToDelete.schoolId !== this.userId) {
          throw new Meteor.Error('utility.deleteStudentUser.unauthorized',
          'Schools may only delete their own students.');
        } else {
          Roles.setUserRoles(studentId, [], this.userId);
          Meteor.users.remove({ _id: studentId });
          Students.remove({ studentId });
        }
      }
    }
  },
});
