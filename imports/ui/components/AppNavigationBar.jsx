/* eslint-disable import/no-extraneous-dependencies */
import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Drawer from 'material-ui/Drawer';
import DataUsage from 'material-ui/svg-icons/device/data-usage';
import Book from 'material-ui/svg-icons/action/book';
import School from 'material-ui/svg-icons/social/school';
import Payment from 'material-ui/svg-icons/action/payment';
// import NavigationClose from 'material-ui/svg-icons/navigation/close';

export default class AppNavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };

    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  getIconElement(iconName) {
    switch (iconName) {
      case 'DataUsage':
        return <DataUsage />;
      case 'Book':
        return <Book />;
      case 'School':
        return <School />;
      case 'Payment':
        return <Payment />;
      default:
        return null;
    }
  }

  handleToggle() {
    this.setState({ open: !this.state.open });
  }

  handleClose() {
    this.setState({ open: false });
  }

  logout() {
    Meteor.logout();
  }

  render() {
    const NavigationArray = this.props.navigationTabs.map(tab => (
      <Link to={tab.route} key={tab.name}>
        <MenuItem
          primaryText={tab.name}
          rightIcon={this.getIconElement(tab.iconName)}
          onTouchTap={this.handleToggle}
        />
      </Link>
    ));

    return (
      <div>
        <AppBar
          title={this.props.title}
          onLeftIconButtonTouchTap={this.handleToggle}
          iconElementRight={
            <IconMenu
              iconButtonElement={
                <IconButton><MoreVertIcon /></IconButton>
              }
              targetOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
              <MenuItem primaryText="Refresh" />
              <MenuItem primaryText="Help" />
              <MenuItem primaryText="Sign out" onTouchTap={this.logout} />
            </IconMenu>
          }
        />
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({ open })}
        >
          {NavigationArray}
        </Drawer>
      </div>
    );
  }
}

AppNavigationBar.propTypes = {
  title: React.PropTypes.string,
  navigationTabs: React.PropTypes.array,
};
