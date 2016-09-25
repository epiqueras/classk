/* eslint-disable import/no-extraneous-dependencies */
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import React from 'react';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Alert from 'react-s-alert';

import AppNavigationBar from '../components/AppNavigationBar.jsx';

export default class SchoolAdmin extends React.Component {

  getChildContext() {
    return { myTeachers: this.props.myTeachers, myStudents: this.props.myStudents };
  }

  componentWillMount() {
    // Check that the user is logged in before the component mounts
    if (!Meteor.loggingIn() && (!this.context.userId
      || !Roles.userIsInRole(this.context.userId, 'school-admin', this.context.userId))) {
      Alert.error('You are not logged in.');
      this.context.router.replace('/');
    }
  }

  componentDidUpdate() {
    // Navigate to a sign in page if the user isn't authenticated when data changes
    if (!Meteor.loggingIn() && (!this.context.userId
      || !Roles.userIsInRole(this.context.userId, 'school-admin', this.context.userId))) {
      Alert.error('You are no longer logged in.');
      this.context.router.replace('/');
    }
  }

  render() {
    const {
      children,
      location,
    } = this.props;

    // clone route components with keys so that they can have transitions
    const clonedChildren = children && React.cloneElement(children, {
      key: location.pathname,
    });

    const AppBarNavigationTabs = [
      { name: 'Stats', iconName: 'DataUsage', route: '/school-admin/stats' },
      { name: 'Teachers', iconName: 'Book', route: '/school-admin/teachers' },
      { name: 'Students', iconName: 'School', route: '/school-admin/students' },
      { name: 'Plan & Payment', iconName: 'Payment', route: '/school-admin/plan-payment' },
    ];

    const title = this.props.mySchool[0] ? this.props.mySchool[0].schoolName : 'Loading...';

    return (
      <div>
        <AppNavigationBar
          title={title}
          navigationTabs={AppBarNavigationTabs}
        />
        {clonedChildren}
      </div>
    );
  }
}

// <div>{this.props.loading ? 'LOADING' : 'DONE LOADING'}</div>

SchoolAdmin.propTypes = {
  loading: React.PropTypes.bool,
  mySchool: React.PropTypes.array,
  myTeachers: React.PropTypes.array,
  myStudents: React.PropTypes.array,
  children: React.PropTypes.element, // matched child route component
  location: React.PropTypes.object,  // current router location
};

SchoolAdmin.contextTypes = {
  router: React.PropTypes.object,
  userId: React.PropTypes.string,
};

SchoolAdmin.childContextTypes = {
  myTeachers: React.PropTypes.array,
  myStudents: React.PropTypes.array,
};
