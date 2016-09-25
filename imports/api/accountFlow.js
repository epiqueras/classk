/* eslint-disable import/no-extraneous-dependencies */
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

if (Meteor.isServer) {
  Meteor.startup(() => {
    Accounts.emailTemplates.enrollAccount.text = function enrollAccountTextChange(user, url) {
      const token = url.substring(url.lastIndexOf('/') + 1, url.length);
      const newUrl = Meteor.absoluteUrl(`enroll-account/${token}`);
      let text = 'Hello,\n';
      text += 'To set your password, please click the following link...\n';
      text += newUrl;
      return text;
    };
    Accounts.emailTemplates.resetPassword.text = function resetPasswordTextChange(user, url) {
      const token = url.substring(url.lastIndexOf('/') + 1, url.length);
      const newUrl = Meteor.absoluteUrl(`reset-password/${token}`);
      let text = 'Hello,\n';
      text += 'To reset your password, please click the following link...\n';
      text += newUrl;
      return text;
    };
  });
}
