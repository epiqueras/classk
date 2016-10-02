/* eslint-disable import/no-extraneous-dependencies */
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import React from 'react';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Alert from 'react-s-alert';

import LoadingScreen from '../components/LoadingScreen.jsx';
import AppNavigationBar from '../components/AppNavigationBar.jsx';

export default class Teacher extends React.Component {
  constructor(props) {
    super(props);
    this.state = { navbarText: '' };
    this.changeNavbarText = this.changeNavbarText.bind(this);
  }

  getChildContext() {
    return {
      mySchoolStudents: this.props.mySchoolStudents,
      changeNavbarText: this.changeNavbarText,
    };
  }

  componentWillMount() {
    // Check that the user is logged in before the component mounts
    if (!Meteor.loggingIn()) {
      if (!this.context.userId) {
        Alert.error('You are not logged in.');
        this.context.router.replace('/');
      } else if (this.props.user.roles) {
        const schoolId = Object.keys(this.props.user.roles)[0];
        if (!Roles.userIsInRole(this.context.userId, 'teacher', schoolId)) {
          Alert.error('You are not authorized to enter this page.');
          this.context.router.replace('/');
        }
      }
    }
  }

  componentDidUpdate() {
    // Navigate to a sign in page if the user isn't authenticated when data changes
    if (!Meteor.loggingIn()) {
      if (!this.context.userId) {
        Alert.error('You are not logged in.');
        this.context.router.replace('/');
      } else if (this.props.user.roles) {
        const schoolId = Object.keys(this.props.user.roles)[0];
        if (!Roles.userIsInRole(this.context.userId, 'teacher', schoolId)) {
          Alert.error('You are not authorized to enter this page.');
          this.context.router.replace('/');
        }
      }
    }
  }

  changeNavbarText(text) {
    this.setState({ navbarText: text });
  }

  render() {
    const {
      myTeacherObject,
      children,
      location,
    } = this.props;

    // clone route components with keys so that they can have transitions
    const clonedChildren = children && React.cloneElement(children, {
      key: location.pathname,
    });

    const AppBarNavigationTabs = [
      { name: 'Stats', iconName: 'DataUsage', route: '/teacher/stats' },
      { name: 'Classes', iconName: 'Group', route: '/teacher/classes' },
      { name: 'Assignments', iconName: 'Assignment', route: '/teacher/assignments' },
    ];

    return (
      <div>
        {this.props.loading ? <LoadingScreen /> :
          <div>
            <AppNavigationBar
              title={myTeacherObject.firstName + this.state.navbarText}
              navigationTabs={AppBarNavigationTabs}
            />
            {clonedChildren}
          </div>
        }
      </div>
    );
  }
}

// <div>{this.props.loading ? 'LOADING' : 'DONE LOADING'}</div>

Teacher.propTypes = {
  user: React.PropTypes.object,
  loading: React.PropTypes.bool,
  myTeacherObject: React.PropTypes.object,
  mySchoolStudents: React.PropTypes.array,
  children: React.PropTypes.element, // matched child route component
  location: React.PropTypes.object,  // current router location
};

Teacher.contextTypes = {
  router: React.PropTypes.object,
  userId: React.PropTypes.string,
};

Teacher.childContextTypes = {
  mySchoolStudents: React.PropTypes.array,
  changeNavbarText: React.PropTypes.func,
};
