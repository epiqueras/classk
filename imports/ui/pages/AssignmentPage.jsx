/* eslint-disable no-underscore-dangle */
import React from 'react';

import LoadingScreen from '../components/LoadingScreen.jsx';
import TextDisplay from '../components/TextDisplay.jsx';

import { getAppropiateRoute } from '../../api/methods.js';

// TODO:
// Continue with assignment page.

export default class AssignmentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.goBack = this.goBack.bind(this);
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

  goBack() {
    this.context.router.goBack();
  }

  render() {
    return (
      <div>
        {this.props.loading ? <LoadingScreen /> :
          <div>
            <div onClick={this.goBack}>Go Back</div>
            <TextDisplay contentJson={this.props.assignment.text} />
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
