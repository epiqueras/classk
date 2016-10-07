/* eslint-disable no-underscore-dangle */
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import Check from 'material-ui/svg-icons/navigation/check';
import RemoveCircleOutline from 'material-ui/svg-icons/content/remove-circle-outline';
import Alert from 'react-s-alert';
import Divider from 'material-ui/Divider';
import DeleteSweep from 'material-ui/svg-icons/content/delete-sweep';

import TextDisplay from './TextDisplay.jsx';
import TextEditor from './TextEditor.jsx';

import {
  acceptAnswer,
  unacceptAnswer,
  deleteAnswer,
  editAnswer,
} from '../../api/answers/methods.js';

export default class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textJson: '',
      textCount: 0,
    };
    this.acceptAnswer = this.acceptAnswer.bind(this);
    this.unacceptAnswer = this.unacceptAnswer.bind(this);
    this.deleteAnswer = this.deleteAnswer.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.getContentJson = this.getContentJson.bind(this);
  }

  getContentJson(jsonString, textLength) {
    this.setState({ textJson: jsonString, textCount: textLength });
  }

  acceptAnswer() {
    if (this.props.questionCreator !== this.context.userId) {
      Alert.error('Only the creator may accept answers.');
      return;
    }
    if (this.props.questionAnswered || this.props.answer.accepted) {
      Alert.error('Question already has an accepted answer.');
      return;
    }
    acceptAnswer.call({ answerId: this.props.answer._id }, (error) => {
      if (error) {
        Alert.error(error.reason);
      } else {
        Alert.success('Answer accepted.');
      }
    });
  }

  unacceptAnswer() {
    if (this.props.questionCreator !== this.context.userId) {
      Alert.error('Only the creator may unaccept answers.');
      return;
    }
    if (!this.props.questionAnswered || !this.props.answer.accepted) {
      Alert.error('Question does not have an accepted answer.');
      return;
    }
    unacceptAnswer.call({ answerId: this.props.answer._id }, (error) => {
      if (error) {
        Alert.error(error.reason);
      } else {
        Alert.success('Answer no longer accepted.');
      }
    });
  }

  deleteAnswer() {
    if (this.props.answer.creatorId !== this.context.userId) {
      Alert.error('This is not your answer.');
    }
    deleteAnswer.call({ answerId: this.props.answer._id }, (error) => {
      if (error) {
        Alert.error(error.reason);
      } else {
        Alert.success('Answer deleted successfuly!');
      }
    });
  }

  saveChanges() {
    if (this.props.answer.creatorId !== this.context.userId) {
      Alert.error('This is not your answer.');
    }
    editAnswer.call({
      answerId: this.props.answer._id,
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
    const { answer, questionAnswered, questionCreator } = this.props;
    const userId = this.context.userId;
    return (
      <div className="col-xs-12">
        <br />
        <Divider />
        <br />
        {!answer.accepted ?
          <Subheader inset style={{ backgroundColor: '#e6e6e6' }}>
            {`${answer.creatorName}:`}
          </Subheader>
        :
          <Subheader inset style={{ backgroundColor: '#27ae60' }}>
            {`Accepted answer by: ${answer.creatorName}`}
          </Subheader>
        }
        {answer.creatorId !== userId ?
          <TextDisplay contentJson={answer.text} />
        :
          <TextEditor
            getContentJson={this.getContentJson}
            contentJson={answer.text}
          />
        }
        {!questionAnswered && !answer.accepted &&
          answer.creatorId !== userId && questionCreator === userId ?
          <RaisedButton
            label="Accept Answer"
            icon={<Check />}
            onClick={this.acceptAnswer}
            fullWidth
            labelColor="#ffffff"
            backgroundColor="#27ae60"
          />
        : ''}
        {questionAnswered && answer.accepted &&
          answer.creatorId !== userId && questionCreator === userId ?
          <RaisedButton
            label="Unaccept Answer"
            icon={<RemoveCircleOutline />}
            onClick={this.unacceptAnswer}
            fullWidth
            labelColor="#ffffff"
            backgroundColor="#e74c3c"
          />
        : ''}
        {answer.creatorId === userId ?
          <div className="row">
            <div className="col-xs-6" style={{ paddingRight: '0px' }}>
              <RaisedButton
                label="Delete Question"
                icon={<DeleteSweep />}
                onClick={this.deleteAnswer}
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
        : ''}
      </div>
    );
  }
}

Answer.propTypes = {
  answer: React.PropTypes.object,
  questionAnswered: React.PropTypes.bool,
  questionCreator: React.PropTypes.string,
};

Answer.contextTypes = {
  userId: React.PropTypes.string,
};
