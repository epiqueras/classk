/* eslint-disable no-underscore-dangle */
import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import GroupAdd from 'material-ui/svg-icons/social/group-add';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

import LoadingScreen from '../components/LoadingScreen.jsx';
import AddClassForm from '../components/AddClassForm.jsx';
import ClassCard from '../components/ClassCard.jsx';

export default class TeacherClassesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      createButtonToggled: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
  }

  componentDidMount() {
    this.context.changeNavbarText('My Classes');
  }

  handleChange(event) {
    this.setState({
      searchValue: event.target.value,
    });
  }

  toggleForm() {
    this.setState({
      createButtonToggled: !this.state.createButtonToggled,
    });
  }

  render() {
    const today = new Date();
    const theClassesList = this.props.myClasses.filter(theClass => (
      (theClass.name).toLowerCase().includes(
        this.state.searchValue.toLowerCase()
      )
    )).map(theClass => {
      const assignments = this.props.assignments.reduce((total, assignment) => (
        assignment.classId === theClass._id && assignment.dueDate > today ? total + 1 : total
      ), 0);
      return (
        <div key={theClass._id} className="col-xs-12 col-md-6">
          <ClassCard
            mySchoolStudents={this.context.mySchoolStudents}
            theClass={theClass}
            notifications={assignments}
          />
          <br />
        </div>
      );
    });

    return (
      <div>
        <div className="row center-xs middle-xs">
          <div className="col-xs-12">
            <div className="row middle-xs center-xs">
              <div className="col-xs-7 col-sm-8">
                <TextField
                  id="text-field-controlled"
                  value={this.state.searchValue}
                  onChange={this.handleChange}
                  fullWidth
                  hintText="Search...."
                  floatingLabelText="Search for a Class...."
                />
              </div>
              <div className="col-xs-4 col-sm-3">
                <FlatButton label="Add Class" icon={<GroupAdd />} onClick={this.toggleForm} />
              </div>
            </div>
          </div>
          <div className="col-xs-12">
            <AddClassForm
              createFormOpen={this.state.createButtonToggled}
              toggleForm={this.toggleForm}
            />
          </div>
          <div className="col-xs-12">
            {this.props.loading ? <LoadingScreen /> :
              <div className="row center-xs">
                <div className="col-xs-11">
                  <Paper style={{ padding: '2%' }} zDepth={1}>
                    <div className="row start-xs">
                      <Subheader style={{ textAlign: 'center', marginBottom: '2%' }}>
                        Classes
                      </Subheader>
                      <Divider />
                      {theClassesList}
                    </div>
                  </Paper>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

TeacherClassesPage.propTypes = {
  loading: React.PropTypes.bool,
  myClasses: React.PropTypes.array,
  assignments: React.PropTypes.array,
};

TeacherClassesPage.contextTypes = {
  mySchoolStudents: React.PropTypes.array,
  changeNavbarText: React.PropTypes.func,
};
