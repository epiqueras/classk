/* eslint-disable import/no-extraneous-dependencies */
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import App from './App.jsx';

export default createContainer(() => { // eslint-disable-line arrow-body-style
  return {
    user: Meteor.user(),
    userId: Meteor.userId(),
    connected: Meteor.status().connected,
  };
}, App);
