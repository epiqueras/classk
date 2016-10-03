/* eslint-disable import/no-extraneous-dependencies */
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
// eslint-disable-next-line import/no-unresolved
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Schools } from './schools.js';

const ColorsSchema = new SimpleSchema({
  primary1Color: { type: String, max: 7 },
  primary2Color: { type: String, max: 7 },
  primary3Color: { type: String, max: 7 },
  accent1Color: { type: String, max: 7 },
});

export const changeColors = new ValidatedMethod({
  name: 'schools.changeColors',
  validate: new SimpleSchema({
    colors: { type: ColorsSchema },
  }).validator(),
  run({ colors }) {
    if (!Roles.userIsInRole(this.userId, 'school-admin', this.userId)) {
      throw new Meteor.Error('schools.changeColors.unauthorized',
        'Only schools may change their colors.');
    } else {
      Schools.update({ schoolId: this.userId }, { $set: { colors } });
    }
  },
});
