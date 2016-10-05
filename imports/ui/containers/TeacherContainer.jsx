/* eslint-disable import/no-extraneous-dependencies */
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Schools } from '../../api/schools/schools.js';
import { Teachers } from '../../api/teachers/teachers.js';
import { Students } from '../../api/students/students.js';
import Teacher from '../layouts/Teacher.jsx';

export default createContainer(() => { // eslint-disable-line arrow-body-style
  const mySchoolHandle = Meteor.subscribe('schools.teacherMySchool');
  const myTeacherObjectHandle = Meteor.subscribe('teachers.myTeacherObject');
  const mySchoolStudentsHandle = Meteor.subscribe('students.mySchoolStudents');
  const myClassesHandle = Meteor.subscribe('classes.classesITeach');
  return {
    user: Meteor.user(),
    loading: !(myTeacherObjectHandle.ready()
      && mySchoolStudentsHandle.ready() && mySchoolHandle.ready()),
    myColors: Schools.findOne({}, { fields: { colors: 1 } }),
    myTeacherObject: Teachers.findOne({ teacherId: Meteor.userId() }),
    mySchoolStudents: Students.find({}).fetch(),
  };
}, Teacher);
