/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-underscore-dangle */
import React from 'react';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Meteor } from 'meteor/meteor';
import Alert from 'react-s-alert';
import ConnectionNotification from '../components/ConnectionNotification.jsx';

const CONNECTION_ISSUE_TIMEOUT = 5000;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showConnectionIssue: false,
      activeTabValue: this.props.location.pathname === '/' ? 'home' : 'signin',
    };
  }

  getChildContext() {
    return { userId: this.props.userId };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ showConnectionIssue: true });
    }, CONNECTION_ISSUE_TIMEOUT);
  }

  logout() {
    Meteor.logout();
    this.context.router.replace('/');
  }

  render() {
    const { showConnectionIssue } = this.state;
    const {
      connected,
      children,
      location,
    } = this.props;

    // clone route components with keys so that they can have transitions
    const clonedChildren = children && React.cloneElement(children, {
      key: location.pathname,
    });

    return (
      <div>
        {clonedChildren}
        {showConnectionIssue && !connected ? <ConnectionNotification /> : null}
        <Alert stack={{ limit: 1 }} offset={64} effect="slide" />
      </div>
    );
  }
}

App.propTypes = {
  user: React.PropTypes.object,      // current meteor user
  userId: React.PropTypes.string,      // current meteor user
  connected: React.PropTypes.bool,   // server connection status
  children: React.PropTypes.element, // matched child route component
  location: React.PropTypes.object,  // current router location
};

App.contextTypes = {
  router: React.PropTypes.object,
};

App.childContextTypes = {
  userId: React.PropTypes.string,
};
