/* eslint-disable no-underscore-dangle */
import React from 'react';
import AssignmentReturn from 'material-ui/svg-icons/action/assignment-return';
import DeleteSweep from 'material-ui/svg-icons/content/delete-sweep';
import RaisedButton from 'material-ui/RaisedButton';
import LoadingScreen from '../components/LoadingScreen.jsx';
import TextEditor from '../components/TextEditor.jsx';

import { getAppropiateRoute } from '../../api/methods.js';

// TODO:
// Continue with assignment page.

export default class AssignmentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textJson: '',
      textCount: 0,
    };
    this.goBack = this.goBack.bind(this);
    this.getContentJson = this.getContentJson.bind(this);
  }

  componentDidMount() {
    if (!this.props.assignment && !this.props.loading) {
      this.context.router.replace(getAppropiateRoute.call({}));
    } else if (this.props.assignment) {
      this.context.changeNavbarText(` - ${this.props.assignment.title}`);
    }
  }

  componentDidUpdate() {
    if (!this.props.assignment && !this.props.loading) {
      this.context.router.replace(getAppropiateRoute.call({}));
    } else if (this.props.assignment) {
      this.context.changeNavbarText(`${this.props.assignment.title}`);
    }
  }

  getContentJson(jsonString, textLength) {
    this.setState({ textJson: jsonString, textCount: textLength });
  }

  goBack() {
    this.context.router.goBack();
  }

  render() {
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
              <TextEditor
                getContentJson={this.getContentJson}
                contentJson={this.props.assignment.text}
              />
            </div>
            <div className="col-xs-6" style={{ paddingRight: '0px' }}>
              <RaisedButton
                label="Delete"
                icon={<DeleteSweep />}
                onClick={this.goBack}
                fullWidth
                primary
              />
            </div>
            <div className="col-xs-6" style={{ paddingLeft: '0px' }}>
              <RaisedButton
                label="Save Changes"
                onClick={this.goBack}
                fullWidth
                secondary
              />
            </div>
          </div>
        }
      </div>
    );
  }
}

AssignmentPage.propTypes = {
  loading: React.PropTypes.bool,
  assignment: React.PropTypes.object,
  questions: React.PropTypes.array,
};

AssignmentPage.contextTypes = {
  changeNavbarText: React.PropTypes.func,
  router: React.PropTypes.object,
};
