/* global document, StatusBar */
/* eslint-disable import/no-extraneous-dependencies */
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { renderRoutes } from '../imports/startup/client/routes.jsx';

Meteor.startup(() => {
  // Needed for onTouchTap
  // http://stackoverflow.com/a/34015469/988941
  injectTapEventPlugin();
  render(renderRoutes(), document.getElementById('render-app'));
  if (Meteor.isCordova) {
    StatusBar.hide();
  }
});
