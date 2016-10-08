/* eslint-disable no-underscore-dangle */
import React from 'react';
import Alert from 'react-s-alert';
import AssignmentReturn from 'material-ui/svg-icons/action/assignment-return';
import DeleteSweep from 'material-ui/svg-icons/content/delete-sweep';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import LoadingScreen from '../components/LoadingScreen.jsx';
import TextEditor from '../components/TextEditor.jsx';
import QuestionsList from '../components/QuestionsList.jsx';
import AskQuestionForm from '../components/AskQuestionForm.jsx';

import { getAppropiateRoute } from '../../api/methods.js';
import { deleteAssignment, editAssignment } from '../../api/assignments/methods.js';

export default class TeacherAssignmentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textJson: '',
      textCount: 0,
      createButtonToggled: false,
    };
    this.goBack = this.goBack.bind(this);
    this.getContentJson = this.getContentJson.bind(this);
    this.deleteAssignment = this.deleteAssignment.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
  }

  componentDidMount() {
    if (!this.props.assignment && !this.props.loading) {
      this.context.router.replace(getAppropiateRoute.call({}));
    } else if (this.props.assignment) {
      this.context.changeNavbarText(this.props.assignment.title);
    }
  }

  componentDidUpdate() {
    if (!this.props.assignment && !this.props.loading) {
      this.context.router.replace(getAppropiateRoute.call({}));
    } else if (this.props.assignment) {
      this.context.changeNavbarText(this.props.assignment.title);
    }
  }

  getContentJson(jsonString, textLength) {
    this.setState({ textJson: jsonString, textCount: textLength });
  }

  goBack() {
    this.context.router.goBack();
  }

  deleteAssignment() {
    deleteAssignment.call({ assignmentId: this.props.assignment._id }, (error) => {
      if (error) {
        Alert.error(error.reason);
      } else {
        Alert.success('Assignment deleted successfuly!');
        this.context.router.goBack();
      }
    });
  }

  saveChanges() {
    editAssignment.call({
      assignmentId: this.props.assignment._id,
      textJson: this.state.textJson,
      textCount: this.state.textCount,
    }, (error) => {
      if (error) {
        Alert.error(error.reason);
      } else {
        Alert.success('Changes saved!');
      }
    });
  }

  toggleForm() {
    this.setState({
      createButtonToggled: !this.state.createButtonToggled,
    });
  }

  render() {
    const clonedChildren = this.props.children && React.cloneElement(this.props.children, {
      key: this.props.location.pathname,
    });
    let display;
    if (!clonedChildren) {
      display = (
        <div className="row">
          <div className="col-xs-12">
            <RaisedButton
              label="Go Back"
              icon={<AssignmentReturn />}
              onClick={this.goBack}
              fullWidth
              secondary
            />
          </div>
          <div className="col-xs-12">
            <TextEditor
              getContentJson={this.getContentJson}
              contentJson={this.props.assignment ? this.props.assignment.text : ''}
            />
          </div>
          <div className="col-xs-6" style={{ paddingRight: '0px' }}>
            <RaisedButton
              label="Delete"
              icon={<DeleteSweep />}
              onClick={this.deleteAssignment}
              fullWidth
              primary
            />
          </div>
          <div className="col-xs-6" style={{ paddingLeft: '0px' }}>
            <RaisedButton
              label="Save Changes"
              onClick={this.saveChanges}
              fullWidth
              secondary
            />
          </div>
          <div className="col-xs-12" style={{ height: '15px' }}>
            <Divider />
          </div>
          <div className="col-xs-12">
            <RaisedButton
              label="Ask Question ?"
              onClick={this.toggleForm}
              fullWidth
              secondary
            />
          </div>
          <div className="col-xs-12">
            <AskQuestionForm
              createFormOpen={this.state.createButtonToggled}
              toggleForm={this.toggleForm}
              assignmentId={this.props.assignment._id}
            />
          </div>
          <div className="col-xs-12">
            {this.props.loading ? <LoadingScreen /> :
              <QuestionsList
                questions={this.props.questions}
              />
            }
          </div>
        </div>
      );
    } else {
      display = clonedChildren;
    }
    return (
      <div>
        <div>{display}</div>
      </div>
    );
  }
}

TeacherAssignmentPage.propTypes = {
  location: React.PropTypes.object,
  children: React.PropTypes.element,
  loading: React.PropTypes.bool,
  assignment: React.PropTypes.object,
  questions: React.PropTypes.array,
};

TeacherAssignmentPage.contextTypes = {
  changeNavbarText: React.PropTypes.func,
  router: React.PropTypes.object,
};
