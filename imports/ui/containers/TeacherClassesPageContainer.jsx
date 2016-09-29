/* eslint-disable import/no-extraneous-dependencies */
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Classes } from '../../api/classes/classes.js';
import TeacherClassesPage from '../pages/TeacherClassesPage.jsx';

export default createContainer(() => { // eslint-disable-line arrow-body-style
  const myClassesHandle = Meteor.subscribe('classes.classesITeach');
  return {
    user: Meteor.user(),
    loading: !(myClassesHandle.ready()),
    myClasses: Classes.find({ teacherId: Meteor.userId() }).fetch(),
  };
}, TeacherClassesPage);
