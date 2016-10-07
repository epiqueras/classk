/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable arrow-body-style */
import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory, IndexRoute, IndexRedirect, Redirect } from 'react-router';

// Route components
import AppContainer from '../../ui/containers/AppContainer.jsx';
import HomeContainer from '../../ui/containers/HomeContainer.jsx';
import HomePage from '../../ui/pages/HomePage.jsx';
import SignInPage from '../../ui/pages/SignInPage.jsx';
import HiddenAdminPage from '../../ui/pages/HiddenAdminPage.jsx';
import EnrollAccountPage from '../../ui/pages/EnrollAccountPage.jsx';
import ForgotPasswordPage from '../../ui/pages/ForgotPasswordPage.jsx';
import ResetPasswordPage from '../../ui/pages/ResetPasswordPage.jsx';

import SchoolAdminContainer from '../../ui/containers/SchoolAdminContainer.jsx';
import SchoolStatsPageContainer from '../../ui/containers/SchoolStatsPageContainer.jsx';
import SchoolTeachersPage from '../../ui/pages/SchoolTeachersPage.jsx';
import SchoolStudentsPage from '../../ui/pages/SchoolStudentsPage.jsx';
import SchoolColorPickerPage from '../../ui/pages/SchoolColorPickerPage.jsx';

import TeacherContainer from '../../ui/containers/TeacherContainer.jsx';
import TeacherStatsPageContainer from '../../ui/containers/TeacherStatsPageContainer.jsx';
import TeacherClassesPageContainer from '../../ui/containers/TeacherClassesPageContainer.jsx';
import TeacherAssignmentsPageContainer
  from '../../ui/containers/TeacherAssignmentsPageContainer.jsx';
import TeacherAssignmentPageContainer from '../../ui/containers/TeacherAssignmentPageContainer.jsx';
import TeacherQuestionPageContainer from '../../ui/containers/TeacherQuestionPageContainer.jsx';

import StudentContainer from '../../ui/containers/StudentContainer.jsx';
import StudentStatsPageContainer from '../../ui/containers/StudentStatsPageContainer.jsx';
import StudentClassesPageContainer from '../../ui/containers/StudentClassesPageContainer.jsx';
import StudentAssignmentsPageContainer
  from '../../ui/containers/StudentAssignmentsPageContainer.jsx';
import StudentAssignmentPageContainer from '../../ui/containers/StudentAssignmentPageContainer.jsx';
import StudentQuestionPageContainer from '../../ui/containers/StudentQuestionPageContainer.jsx';

import NotFoundPage from '../../ui/pages/NotFoundPage.jsx';

import { getAppropiateRoute } from '../../api/methods.js';

// eslint-dsiable-next-line no unused
const userIsLoggedIn = (nextState, replace, callback) => {
  if (Meteor.userId() && !Meteor.loggingIn()) {
    replace(getAppropiateRoute.call({}));
    callback();
  }
  callback();
};

export const renderRoutes = () => ( // eslint-disable-line import/prefer-default-export
  <Router history={browserHistory}>
    <Route path="/" component={AppContainer}>
      <Route component={HomeContainer} onEnter={userIsLoggedIn}>
        <IndexRoute component={HomePage} />
        <Route path="signin" component={SignInPage} />
        <Route path="forgot-password" component={ForgotPasswordPage} />
        <Route path="enroll-account/:token" component={EnrollAccountPage} />
        <Route path="reset-password/:token" component={ResetPasswordPage} />
      </Route>
      <Route path="school-admin" component={SchoolAdminContainer}>
        <IndexRedirect to="stats" />
        <Route path="stats" component={SchoolStatsPageContainer} />
        <Route path="teachers" component={SchoolTeachersPage} />
        <Route path="students" component={SchoolStudentsPage} />
        <Route path="color-picker" component={SchoolColorPickerPage} />
      </Route>
      <Route path="teacher" component={TeacherContainer}>
        <IndexRedirect to="stats" />
        <Route path="stats" component={TeacherStatsPageContainer} />
        <Route path="classes" component={TeacherClassesPageContainer} />
        <Route path="assignments(/:classId)" component={TeacherAssignmentsPageContainer}>
          <Route
            path="/teacher/questions/:assignmentId"
            component={TeacherAssignmentPageContainer}
          >
            <Route
              path="answers/:questionId"
              component={TeacherQuestionPageContainer}
            />
          </Route>
        </Route>
      </Route>
      <Route path="student" component={StudentContainer}>
        <IndexRedirect to="stats" />
        <Route path="stats" component={StudentStatsPageContainer} />
        <Route path="classes" component={StudentClassesPageContainer} />
        <Route path="assignments(/:classId)" component={StudentAssignmentsPageContainer}>
          <Route
            path="/student/questions/:assignmentId"
            component={StudentAssignmentPageContainer}
          >
            <Route
              path="answers/:questionId"
              component={StudentQuestionPageContainer}
            />
          </Route>
        </Route>
      </Route>
      <Route path="hidden-admin" component={HiddenAdminPage} />
      <Route path="404" component={NotFoundPage} />
      <Redirect from="*" to="404" />
    </Route>
  </Router>
);
