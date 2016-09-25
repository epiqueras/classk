/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prefer-arrow-callback */
import { Meteor } from 'meteor/meteor';
import { Schools } from '../schools.js';

Meteor.publish('schools.mySchool', function publishAllMySchools() {
  return Schools.find({
    schoolId: this.userId,
  }, {
    fields: Schools.publicFields,
  });
});
