import React from 'react';
import AssignmentReturned from 'material-ui/svg-icons/action/assignment-returned';
import RaisedButton from 'material-ui/RaisedButton';

import LoadingScreen from '../components/LoadingScreen.jsx';
import AssignmentsList from '../components/AssignmentsList.jsx';
import AddAssignmentForm from '../components/AddAssignmentForm.jsx';

// TODO:
// Show assignments in list.

export default class TeacherAssignmentsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      createButtonToggled: false,
    };
    this.toggleForm = this.toggleForm.bind(this);
  }

  toggleForm() {
    this.setState({
      createButtonToggled: !this.state.createButtonToggled,
    });
  }

  render() {
    return (
      <div>
        {this.props.loading ? <LoadingScreen /> :
          <div>
            <div className="row">
              <div className="col-xs-12">
                <RaisedButton
                  label="Set Assignment"
                  icon={<AssignmentReturned />}
                  onClick={this.toggleForm}
                  fullWidth
                  secondary
                />
              </div>
              <div className="col-xs-12">
                <AddAssignmentForm
                  createFormOpen={this.state.createButtonToggled}
                  toggleForm={this.toggleForm}
                  classId={this.props.classId}
                  myClasses={this.props.myClasses}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                <AssignmentsList />
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

TeacherAssignmentsPage.propTypes = {
  loading: React.PropTypes.bool,
  myAssignments: React.PropTypes.array,
  myClasses: React.PropTypes.array,
  classId: React.PropTypes.string,
};

TeacherAssignmentsPage.contextTypes = {
};
