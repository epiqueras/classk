/* eslint-disable import/no-extraneous-dependencies */
import { Mongo } from 'meteor/mongo';
// eslint-disable-next-line import/no-unresolved
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

// eslint-disable-next-line import/prefer-default-export
export const Schools = new Mongo.Collection('Schools');

// Deny all client-side updates since we will be using methods to manage this collection
Schools.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

const ColorsSchema = new SimpleSchema({
  primary1Color: { type: String, max: 7 },
  primary2Color: { type: String, max: 7 },
  primary3Color: { type: String, max: 7 },
  accent1Color: { type: String, max: 7 },
});

Schools.schema = new SimpleSchema({
  _id: { type: String, regEx: SimpleSchema.RegEx.Id },
  schoolId: { type: String, regEx: SimpleSchema.RegEx.Id },
  schoolName: { type: String, max: 30 },
  createdAt: { type: Date, defaultValue: new Date() },
  colors: {
    type: ColorsSchema,
    defaultValue: {
      primary1Color: '#303F9F',
      primary2Color: '#3F51B5',
      primary3Color: '#C5CAE9',
      accent1Color: '#00BCD4',
    },
  },
});

Schools.attachSchema(Schools.schema);

Schools.publicFields = {
  schoolId: 1,
  schoolName: 1,
  createdAt: 1,
  colors: 1,
};
