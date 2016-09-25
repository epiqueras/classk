/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-underscore-dangle */
import React from 'react';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Meteor } from 'meteor/meteor';
import { Tabs, Tab } from 'material-ui/Tabs';

import { getAppropiateRoute } from '../../api/methods.js';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabValue: this.props.location.pathname === '/' ? 'home' : 'signin',
    };
  }

  getChildContext() {
    return { loginAttempts: this.props.loginAttempts };
  }

  componentWillMount() {
    if (this.context.userId && !Meteor.loggingIn()) {
      this.context.router.replace(getAppropiateRoute.call({}));
    }
  }

  componentDidUpdate() {
    if (this.context.userId && !Meteor.loggingIn()) {
      this.context.router.replace(getAppropiateRoute.call({}));
    }
  }

  handleChange(value) {
    this.setState({
      activeTabValue: value,
    });
  }

  handleActive(tab) {
    this.context.router.replace(tab.props['data-route']);
  }

  logout() {
    Meteor.logout();
    this.context.router.replace('/');
  }

  render() {
    // clone route components with keys so that they can have transitions
    const clonedChildren = this.props.children && React.cloneElement(this.props.children, {
      key: this.props.location.pathname,
    });
    return (
      <Tabs
        value={this.state.activeTabValue}
        onChange={this.handleChange.bind(this)}
      >
        <Tab
          label="Home"
          value="home"
          data-route="/"
          onActive={this.handleActive.bind(this)}
        >
          <div>
            {clonedChildren}
          </div>
        </Tab>
        <Tab
          label="Sign In"
          value="signin"
          data-route="/signin"
          onActive={this.handleActive.bind(this)}
        >
          <div>
            {clonedChildren}
          </div>
        </Tab>
      </Tabs>
    );
  }
}

Home.propTypes = {
  loading: React.PropTypes.bool,
  loginAttempts: React.PropTypes.object,
  children: React.PropTypes.element, // matched child route component
  location: React.PropTypes.object,  // current router location
};

Home.contextTypes = {
  router: React.PropTypes.object,
  userId: React.PropTypes.string,
};

Home.childContextTypes = {
  loginAttempts: React.PropTypes.object,
};
