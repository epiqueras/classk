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
import SchoolStatsPage from '../../ui/pages/SchoolStatsPage.jsx';
import SchoolTeachersPage from '../../ui/pages/SchoolTeachersPage.jsx';
import SchoolStudentsPage from '../../ui/pages/SchoolStudentsPage.jsx';
import SchoolPaymentPage from '../../ui/pages/SchoolPaymentPage.jsx';

import TeacherContainer from '../../ui/containers/TeacherContainer.jsx';
import TeacherStatsPage from '../../ui/pages/TeacherStatsPage.jsx';
import TeacherClassesPage from '../../ui/pages/TeacherClassesPage.jsx';
import TeacherAssignmentsPage from '../../ui/pages/TeacherAssignmentsPage.jsx';

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
        <Route path="stats" component={SchoolStatsPage} />
        <Route path="teachers" component={SchoolTeachersPage} />
        <Route path="students" component={SchoolStudentsPage} />
        <Route path="plan-payment" component={SchoolPaymentPage} />
      </Route>
      <Route path="teacher" component={TeacherContainer}>
        <IndexRedirect to="stats" />
        <Route path="stats" component={TeacherStatsPage} />
        <Route path="classes" component={TeacherClassesPage} />
        <Route path="assignments" component={TeacherAssignmentsPage} />
      </Route>
      <Route path="hidden-admin" component={HiddenAdminPage} />
      <Route path="404" component={NotFoundPage} />
      <Redirect from="*" to="404" />
    </Route>
  </Router>
);
