/* global Assets */
/* eslint-disable import/no-extraneous-dependencies */
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

if (Meteor.isServer) {
  Meteor.startup(() => {
    Accounts.emailTemplates.enrollAccount.from = function setEnrollAccountSubject() {
      return 'Classk <beta@classk.me>';
    };
    Accounts.emailTemplates.resetPassword.from = function setResetPasswordSubject() {
      return 'Classk <beta@classk.me>';
    };
    Accounts.emailTemplates.enrollAccount.subject = function enrollAccountSubjectChange(user) {
      return `Welcome to Classk, ${user.profile.name}`;
    };
    Accounts.emailTemplates.resetPassword.subject = function resetPasswordSubjectChange() {
      return 'Classk Password Reset';
    };
    Accounts.emailTemplates.enrollAccount.html = function enrollAccountTextChange(user, url) {
      const token = url.substring(url.lastIndexOf('/') + 1, url.length);
      const newUrl = Meteor.absoluteUrl(`enroll-account/${token}`);
      const imgUrl = Meteor.absoluteUrl('classk-email-image.png');
      return Assets.getText('welcome-email.html').replace(
        '{{tokenLinkPlaceholder}}', newUrl
      ).replace('{{imgUrlPlaceholder}}', imgUrl).replace('{{namePlaceholder}}', user.profile.name);
    };
    Accounts.emailTemplates.resetPassword.html = function resetPasswordTextChange(user, url) {
      const token = url.substring(url.lastIndexOf('/') + 1, url.length);
      const newUrl = Meteor.absoluteUrl(`reset-password/${token}`);
      const imgUrl = Meteor.absoluteUrl('classk-email-image.png');
      return Assets.getText('forgot-password-email.html').replace(
        '{{tokenLinkPlaceholder}}', newUrl
      ).replace('{{imgUrlPlaceholder}}', imgUrl).replace('{{namePlaceholder}}', user.profile.name);
    };
  });
}
