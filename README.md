# Classk? React/Meteor Web App

I wanted to learn Meteor and React while building a fully functional web application following all the best practices outlined in the Meteor Guide. I also succesfuly ran it on iOS and Android using Cordova.

The app is a fairly simple Q&A platform for school homework.

<br/>

##Schools
  - Log in and look at how many questions their students have unanswered.
  - Add students and teachers by writing their names and email addresses.
    - Teachers/Students receive a responsive html email with a button that takes them to set their new password.
  - They may also change the app's color palette and apply it to all of it's teacher and student accounts.

##Teachers
  - Log in and look at how many questions their students have unanswered.
  - Create classes and add students to them.
  - Add assignments to their classes and ask or answer questions.
  - Accept answers to their questions to close them.

##Students
  - Log in and look at how many questions their peers have unanswered.
  - Ask questions on assignments and answer their peers or teacher.
  - Accept answers to their questions to close them.

<br/>

###Some Packages I used:
- React Router for Routes
- Meteor's accounts-base package
- Alanning's Roles package for secured routes, methods, and publications
- Aldeed's Collection2 for schemas and validation in methods and collections
- Material UI React Components
- Flexboxgrid
- React Progressbar.js
- React Quill.js component for the text editor with code blocks and KaTex math expressions.


The only things missing are tests and rate limiters on methods.