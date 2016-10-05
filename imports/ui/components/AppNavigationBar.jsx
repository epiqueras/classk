/* eslint-disable import/no-extraneous-dependencies */
import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Link } from 'react-router';
import Badge from 'material-ui/Badge';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Drawer from 'material-ui/Drawer';
import Group from 'material-ui/svg-icons/social/group';
import Assignment from 'material-ui/svg-icons/action/assignment';
import DataUsage from 'material-ui/svg-icons/device/data-usage';
import Book from 'material-ui/svg-icons/action/book';
import School from 'material-ui/svg-icons/social/school';
import ColorLens from 'material-ui/svg-icons/image/color-lens';
// import NavigationClose from 'material-ui/svg-icons/navigation/close';

export default class AppNavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };

    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  getIconElement(iconName) {
    switch (iconName) {
      case 'Group':
        return <Group />;
      case 'Assignment':
        return <Assignment />;
      case 'DataUsage':
        return <DataUsage />;
      case 'Book':
        return <Book />;
      case 'School':
        return <School />;
      case 'ColorLens':
        return <ColorLens />;
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

  refresh() {
    this.context.router.replace('/');
  }

  logout() {
    Meteor.logout();
  }

  render() {
    const NavigationArray = this.props.navigationTabs.map(tab => (
      <div key={tab.name} className="row start-xs middle-xs">
        <div className="col-xs-7">
          <Link to={tab.route}>
            <MenuItem
              primaryText={tab.name}
              onTouchTap={this.handleToggle}
              style={{ marginRight: '-16px' }}
            />
          </Link>
        </div>
        {tab.notifications && tab.notifications !== 0 ?
          <div className="col-xs-3" style={{ paddingLeft: '6px' }}>
            <Badge
              badgeContent={tab.notifications}
              primary
            >
              <Link to={tab.route} onClick={this.handleToggle}>
                {this.getIconElement(tab.iconName)}
              </Link>
            </Badge>
          </div>
        :
          <div className="col-xs-3" style={{ paddingLeft: '6px', marginLeft: '13px' }}>
            <Link to={tab.route} onClick={this.handleToggle}>
              {this.getIconElement(tab.iconName)}
            </Link>
          </div>
        }
      </div>
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
              <MenuItem primaryText="Refresh" onTouchTap={this.refresh} />
              <MenuItem primaryText="Sign out" onTouchTap={this.logout} />
            </IconMenu>
          }
        />
        <Drawer
          docked={false}
          width={185}
          open={this.state.open}
          onRequestChange={(open) => this.setState({ open })}
        >
          <div className="row start-xs middle-xs">
            <div className="col-xs-12">{NavigationArray}</div>
          </div>
        </Drawer>
      </div>
    );
  }
}

AppNavigationBar.propTypes = {
  title: React.PropTypes.string,
  navigationTabs: React.PropTypes.array,
};

AppNavigationBar.contextTypes = {
  router: React.PropTypes.object,
};
