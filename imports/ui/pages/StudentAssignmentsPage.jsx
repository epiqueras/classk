/* eslint-disable no-underscore-dangle */
import React from 'react';
import AssignmentReturned from 'material-ui/svg-icons/action/assignment-returned';
import RaisedButton from 'material-ui/RaisedButton';

import LoadingScreen from '../components/LoadingScreen.jsx';
import AssignmentsList from '../components/AssignmentsList.jsx';

export default class StudentAssignments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      createButtonToggled: false,
    };
    this.toggleForm = this.toggleForm.bind(this);
  }

  componentDidMount() {
    let className = '';
    if (this.props.myClasses) {
      className = this.props.myClasses.filter(theClass => (
        theClass._id === this.props.classId
      ));
      if (className.length === 0) {
        className = 'All Classes';
        if (!this.props.loading && this.props.classId) {
          this.context.router.replace('/student/classes');
        }
      } else {
        className = className[0].name;
      }
    }
    this.context.changeNavbarText(`Class: ${className}`);
  }

  componentDidUpdate() {
    let className = '';
    if (this.props.myClasses) {
      className = this.props.myClasses.filter(theClass => (
        theClass._id === this.props.classId
      ));
      if (className.length === 0) {
        className = 'All Classes';
        if (!this.props.loading && this.props.classId) {
          this.context.router.replace('/student/classes');
        }
      } else {
        className = className[0].name;
      }
    }
    this.context.changeNavbarText(`Class: ${className}`);
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
        <div>
          <div className="row">
            <div className="col-xs-12">
              <AssignmentsList
                assignments={this.props.assignments}
                classId={this.props.classId}
                myClasses={this.props.myClasses}
                studentView
              />
            </div>
          </div>
        </div>
      );
    } else {
      display = clonedChildren;
    }
    return (
      <div>
        {this.props.loading ? <LoadingScreen /> :
          <div>{display}</div>
        }
      </div>
    );
  }
}

StudentAssignments.propTypes = {
  location: React.PropTypes.object,
  children: React.PropTypes.element,
  loading: React.PropTypes.bool,
  assignments: React.PropTypes.array,
  myClasses: React.PropTypes.array,
  classId: React.PropTypes.string,
};

StudentAssignments.contextTypes = {
  changeNavbarText: React.PropTypes.func,
  router: React.PropTypes.object,
};
