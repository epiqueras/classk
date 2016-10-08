/* eslint-disable no-underscore-dangle */
import React from 'react';
import AssignmentReturn from 'material-ui/svg-icons/action/assignment-return';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import LoadingScreen from '../components/LoadingScreen.jsx';
import TextDisplay from '../components/TextDisplay.jsx';
import QuestionsList from '../components/QuestionsList.jsx';
import AskQuestionForm from '../components/AskQuestionForm.jsx';

import { getAppropiateRoute } from '../../api/methods.js';

export default class StudentAssignmentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textJson: '',
      textCount: 0,
      createButtonToggled: false,
    };
    this.goBack = this.goBack.bind(this);
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

  goBack() {
    this.context.router.goBack();
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
            <TextDisplay
              contentJson={this.props.assignment ? this.props.assignment.text : ''}
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
                studentView
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

StudentAssignmentPage.propTypes = {
  location: React.PropTypes.object,
  children: React.PropTypes.element,
  loading: React.PropTypes.bool,
  assignment: React.PropTypes.object,
  questions: React.PropTypes.array,
};

StudentAssignmentPage.contextTypes = {
  changeNavbarText: React.PropTypes.func,
  router: React.PropTypes.object,
};
