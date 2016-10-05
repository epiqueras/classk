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

export default class SchoolAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
      testPrimaryColors: '',
      testAccentColor: '',
    };
    this.setTestPrimaryColors = this.setTestPrimaryColors.bind(this);
    this.setTestAccentColor = this.setTestAccentColor.bind(this);
  }

  getChildContext() {
    return {
      myTeachers: this.props.myTeachers,
      myStudents: this.props.myStudents,
      myColors: this.props.myColors ? this.props.myColors.colors : {},
      setTestPrimaryColors: this.setTestPrimaryColors,
      setTestAccentColor: this.setTestAccentColor,
    };
  }

  componentWillMount() {
    // Check that the user is logged in before the component mounts
    if (!Meteor.loggingIn()) {
      if (!this.context.userId) {
        Alert.error('You are not logged in.');
        this.context.router.replace('/');
      } else if (!Roles.userIsInRole(this.context.userId, 'school-admin', this.context.userId)) {
        Alert.error('You are not authorized to enter this page.');
        this.context.router.replace('/');
      }
    }
  }

  componentDidUpdate() {
    // Navigate to a sign in page if the user isn't authenticated when data changes
    if (!Meteor.loggingIn()) {
      if (!this.context.userId) {
        Alert.error('You are not logged in.');
        this.context.router.replace('/');
      } else if (!Roles.userIsInRole(this.context.userId, 'school-admin', this.context.userId)) {
        Alert.error('You are not authorized to enter this page.');
        this.context.router.replace('/');
      }
    }
  }

  setTestPrimaryColors(colors) {
    this.setState({ testPrimaryColors: colors });
  }

  setTestAccentColor(color) {
    this.setState({ testAccentColor: color });
  }

  render() {
    const {
      children,
      location,
    } = this.props;
    const myColors = this.props.myColors ? this.props.myColors.colors : '';
    const testPrimaryColors = this.state.testPrimaryColors;
    const testAccentColor = this.state.testAccentColor;

    let customMuiTheme;
    if (!testPrimaryColors && !testAccentColor && myColors) {
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
    } else if (!testPrimaryColors && myColors) {
      customMuiTheme = getMuiTheme({
        palette: {
          primary1Color: myColors.primary1Color,
          primary2Color: myColors.primary2Color,
          primary3Color: myColors.primary3Color,
          accent1Color: testAccentColor,
          textColor: colorPalette.textColor,
          alternateTextColor: colorPalette.alternateTextColor,
        },
      });
    } else if (!testAccentColor && myColors) {
      customMuiTheme = getMuiTheme({
        palette: {
          primary1Color: testPrimaryColors.primary1Color,
          primary2Color: testPrimaryColors.primary2Color,
          primary3Color: testPrimaryColors.primary3Color,
          accent1Color: myColors.accent1Color,
          textColor: colorPalette.textColor,
          alternateTextColor: colorPalette.alternateTextColor,
        },
      });
    } else if (myColors) {
      customMuiTheme = getMuiTheme({
        palette: {
          primary1Color: testPrimaryColors.primary1Color,
          primary2Color: testPrimaryColors.primary2Color,
          primary3Color: testPrimaryColors.primary3Color,
          accent1Color: testAccentColor,
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

    const AppBarNavigationTabs = [
      { name: 'Stats', iconName: 'DataUsage', route: '/school-admin/stats' },
      { name: 'Teachers', iconName: 'Book', route: '/school-admin/teachers' },
      { name: 'Students', iconName: 'School', route: '/school-admin/students' },
      { name: 'Colors', iconName: 'ColorLens', route: '/school-admin/color-picker' },
    ];

    const title = this.props.mySchool ? this.props.mySchool.schoolName : 'Loading...';

    return (
      <div>
        <MuiThemeProvider muiTheme={customMuiTheme}>
          {this.props.loading ? <LoadingScreen /> :
            <div>
              <AppNavigationBar
                title={title}
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

// <div>{this.props.loading ? 'LOADING' : 'DONE LOADING'}</div>

SchoolAdmin.propTypes = {
  loading: React.PropTypes.bool,
  myColors: React.PropTypes.object,
  mySchool: React.PropTypes.object,
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
  myColors: React.PropTypes.object,
  setTestPrimaryColors: React.PropTypes.func,
  setTestAccentColor: React.PropTypes.func,
};
