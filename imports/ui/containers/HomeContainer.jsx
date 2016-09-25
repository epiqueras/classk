/* eslint-disable import/no-extraneous-dependencies */
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { LoginAttempts } from '../../api/loginAttempts/loginAttempts.js';
import Home from '../layouts/Home.jsx';

export default createContainer(() => { // eslint-disable-line arrow-body-style
  const publicLoginAttemptsHandle = Meteor.subscribe('loginAttempts.public');
  return {
    loading: !(publicLoginAttemptsHandle.ready()),
    loginAttempts: LoginAttempts.findOne(),
  };
}, Home);
