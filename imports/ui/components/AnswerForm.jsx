/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import Alert from 'react-s-alert';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

import TextEditor from './TextEditor.jsx';

import { insertNewAnswer } from '../../api/answers/methods.js';

export default class AnswerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      textJson: '',
      textCount: 0,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.getContentJson = this.getContentJson.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.props.questionCreator === this.context.userId) {
      Alert.error('You can not answer your own question');
      return;
    }
    const target = event.target;
    const title = target.title.value;
    const questionId = this.props.questionId;
    const textJson = this.state.textJson;
    const textCount = this.state.textCount;
    if (!title) {
      this.setState({
        errors: { title: 'Assignment title is required.' },
      });
      return;
    }
    if (title.length > 30) {
      this.setState({
        errors: { title: 'Title may not exceed 30 characters.' },
      });
      return;
    }
    if (!textJson) {
      Alert.error('Text is required.');
      return;
    }
    if (textCount > 10000) {
      Alert.error('Text may not exceed 10000 characters.');
      return;
    }
    insertNewAnswer.call({ title, questionId, textJson, textCount }, (error) => {
      if (error) {
        Alert.error(error.reason);
      } else {
        Alert.success('Answer submitted!');
        this.props.toggleForm();
        target.title.value = '';
      }
    });
  }

  getContentJson(jsonString, textLength) {
    this.setState({ textJson: jsonString, textCount: textLength });
  }

  render() {
    return (
      <div className="row center-xs middle-xs">
        {this.props.createFormOpen ?
          <div className="col-xs-12">
            <Paper zDepth={1}>
              <form onChange={(e) => { e.stopPropagation(); }} onSubmit={this.onSubmit}>
                <div className="row center-xs middle-xs around-xs">
                  <div className="col-xs-12">
                    <TextField
                      name="title"
                      type="text"
                      hintText="Title"
                      floatingLabelText="Title"
                      errorText={this.state.errors.title}
                    />
                  </div>
                </div>
                <br /><br />
                <div className="row">
                  <div className="col-xs-12">
                    <TextEditor getContentJson={this.getContentJson} />
                  </div>
                </div>
                <br />
                <RaisedButton type="submit" label="Submit Answer" primary />
                <br /><br />
              </form>
            </Paper>
            <br /><br />
          </div>
        : ''}
      </div>
    );
  }
}

AnswerForm.propTypes = {
  createFormOpen: React.PropTypes.bool,
  toggleForm: React.PropTypes.func,
  questionId: React.PropTypes.string,
  questionCreator: React.PropTypes.string,
};

AnswerForm.contextTypes = {
  userId: React.PropTypes.string,
};
