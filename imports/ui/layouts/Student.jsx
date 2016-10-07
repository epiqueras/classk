/* eslint-disable import/no-extraneous-dependencies */
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Alert from 'react-s-alert';

import LoadingScreen from '../components/LoadingScreen.jsx';
import AppNavigationBar from '../components/AppNavigationBar.jsx';

import colorPalette from '../stylesheets/colorPalette.jsx';

export default class Student extends React.Component {
  constructor(props) {
    super(props);
    this.state = { navbarText: '' };
    this.changeNavbarText = this.changeNavbarText.bind(this);
  }

  getChildContext() {
    return {
      changeNavbarText: this.changeNavbarText,
      myColors: this.props.myColors ? this.props.myColors.colors : {},
    };
  }

  componentWillMount() {
    // Check that the user is logged in before the component mounts
    if (!Meteor.loggingIn()) {
      if (!this.context.userId) {
        Alert.error('You are not logged in.');
        this.context.router.replace('/');
      } else if (this.props.user && this.props.user.roles) {
        const schoolId = Object.keys(this.props.user.roles)[0];
        if (!Roles.userIsInRole(this.context.userId, 'student', schoolId)) {
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
      } else if (this.props.user && this.props.user.roles) {
        const schoolId = Object.keys(this.props.user.roles)[0];
        if (!Roles.userIsInRole(this.context.userId, 'student', schoolId)) {
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
      myStudentObject,
      children,
      location,
    } = this.props;
    const myColors = this.props.myColors ? this.props.myColors.colors : '';

    let customMuiTheme;
    if (myColors) {
      customMuiTheme = getMuiTheme({
        palette: {
          primary1Color: myColors.primary1Color,
          primary2Color: myColors.primary2Color,
          primary3Color: myColors.primary3Color,
          accent1Color: myColors.accent1Color,
          textColor: colorPalette.textColor,
          alternateTextColor: colorPalette.alternateTextColor,
        },
      });
    } else {
      customMuiTheme = getMuiTheme({
        palette: {
          primary1Color: colorPalette.primary1Color,
          primary2Color: colorPalette.primary2Color,
          primary3Color: colorPalette.primary3Color,
          accent1Color: colorPalette.accent1Color,
          textColor: colorPalette.textColor,
          alternateTextColor: colorPalette.alternateTextColor,
        },
      });
    }

    // clone route components with keys so that they can have transitions
    const clonedChildren = children && React.cloneElement(children, {
      key: location.pathname,
    });

    const today = new Date();
    const assignments = this.props.assignments.reduce((total, assignment) => (
      assignment.dueDate > today ? total + 1 : total
    ), 0);

    const AppBarNavigationTabs = [
      { name: 'Stats', iconName: 'DataUsage', route: '/student/stats' },
      {
        name: 'Classes',
        iconName: 'Group',
        route: '/student/classes',
      },
      {
        name: 'Assignments',
        iconName: 'Assignment',
        route: '/student/assignments',
        notifications: assignments,
      },
    ];

    return (
      <div>
        <MuiThemeProvider muiTheme={customMuiTheme}>
        {this.props.loading ? <LoadingScreen /> :
          <div>
            <AppNavigationBar
              title={this.state.navbarText ? this.state.navbarText : myStudentObject.firstName}
              navigationTabs={AppBarNavigationTabs}
            />
            {clonedChildren}
          </div>
        }
        </MuiThemeProvider>
      </div>
    );
  }
}

Student.propTypes = {
  user: React.PropTypes.object,
  loading: React.PropTypes.bool,
  myColors: React.PropTypes.object,
  myStudentObject: React.PropTypes.object,
  assignments: React.PropTypes.array,
  children: React.PropTypes.element,
  location: React.PropTypes.object,
};

Student.contextTypes = {
  router: React.PropTypes.object,
  userId: React.PropTypes.string,
};

Student.childContextTypes = {
  changeNavbarText: React.PropTypes.func,
  myColors: React.PropTypes.object,
};
