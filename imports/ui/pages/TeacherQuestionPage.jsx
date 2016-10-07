/* eslint-disable no-underscore-dangle */
import React from 'react';
import Alert from 'react-s-alert';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import AssignmentReturn from 'material-ui/svg-icons/action/assignment-return';
import DeleteSweep from 'material-ui/svg-icons/content/delete-sweep';

import LoadingScreen from '../components/LoadingScreen.jsx';
import TextDisplay from '../components/TextDisplay.jsx';
import TextEditor from '../components/TextEditor.jsx';
import AnswerForm from '../components/AnswerForm.jsx';
import Answer from '../components/Answer.jsx';

import { getAppropiateRoute } from '../../api/methods.js';
import { deleteQuestion, editQuestion } from '../../api/questions/methods.js';

export default class TeacherQuestionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textJson: '',
      textCount: 0,
      createButtonToggled: false,
    };
    this.getContentJson = this.getContentJson.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.goBack = this.goBack.bind(this);
    this.deleteQuestion = this.deleteQuestion.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
  }

  componentDidMount() {
    if (!this.props.question && !this.props.loading) {
      this.context.router.replace(getAppropiateRoute.call({}));
    } else if (this.props.question) {
      this.context.changeNavbarText(this.props.question.title);
    }
  }

  componentDidUpdate() {
    if (!this.props.question && !this.props.loading) {
      this.context.router.replace(getAppropiateRoute.call({}));
    } else if (this.props.question) {
      this.context.changeNavbarText(this.props.question.title);
    }
  }

  getContentJson(jsonString, textLength) {
    this.setState({ textJson: jsonString, textCount: textLength });
  }

  toggleForm() {
    this.setState({
      createButtonToggled: !this.state.createButtonToggled,
    });
  }

  goBack() {
    this.context.router.goBack();
  }

  deleteQuestion() {
    if (this.props.question.creatorId !== this.context.userId) {
      Alert.error('This is not your question.');
    }
    deleteQuestion.call({ questionId: this.props.question._id }, (error) => {
      if (error) {
        Alert.error(error.reason);
      } else {
        Alert.success('Question deleted successfuly!');
        this.context.router.goBack();
      }
    });
  }

  saveChanges() {
    if (this.props.question.creatorId !== this.context.userId) {
      Alert.error('This is not your question.');
    }
    editQuestion.call({
      questionId: this.props.question._id,
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

  render() {
    let answersList = this.props.answers.sort((answerA, answerB) => (
      answerB.accepted
    )).map(answer => (
      <Answer
        key={answer._id}
        answer={answer}
        questionAnswered={this.props.question.answered}
        questionCreator={this.props.question.creatorId}
      />
    ));
    if (answersList.length === 0) {
      answersList = (
        <div className="col-xs-12" style={{ marginTop: '10px' }}>
          <Subheader inset style={{ backgroundColor: '#e6e6e6' }}>
            No answers yet.
          </Subheader>
        </div>
      );
    }
    return (
      <div>
        {this.props.loading ? <LoadingScreen /> :
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
              {this.props.question.creatorId !== this.context.userId ?
                <TextDisplay contentJson={this.props.question.text} />
              :
                <TextEditor
                  getContentJson={this.getContentJson}
                  contentJson={this.props.question.text}
                />
              }
            </div>
            <div className="col-xs-12">
              {this.props.question.creatorId !== this.context.userId ?
                <div className="row">
                  <div className="col-xs-12">
                    <RaisedButton
                      label="Answer"
                      onClick={this.toggleForm}
                      fullWidth
                      secondary
                    />
                  </div>
                  <div className="col-xs-12">
                    <AnswerForm
                      createFormOpen={this.state.createButtonToggled}
                      toggleForm={this.toggleForm}
                      questionId={this.props.question._id}
                      questionCreator={this.props.question.creatorId}
                    />
                  </div>
                </div>
              :
                <div className="row">
                  <div className="col-xs-6" style={{ paddingRight: '0px' }}>
                    <RaisedButton
                      label="Delete Question"
                      icon={<DeleteSweep />}
                      onClick={this.deleteQuestion}
                      fullWidth
                      labelColor="#ffffff"
                      backgroundColor="#e74c3c"
                    />
                  </div>
                  <div className="col-xs-6" style={{ paddingLeft: '0px' }}>
                    <RaisedButton
                      label="Save Changes"
                      onClick={this.saveChanges}
                      fullWidth
                      primary
                    />
                  </div>
                </div>
              }
            </div>
            {answersList}
          </div>
        }
      </div>
    );
  }
}

TeacherQuestionPage.propTypes = {
  loading: React.PropTypes.bool,
  question: React.PropTypes.object,
  answers: React.PropTypes.array,
};

TeacherQuestionPage.contextTypes = {
  router: React.PropTypes.object,
  changeNavbarText: React.PropTypes.func,
  userId: React.PropTypes.string,
};
