import React from 'react';
import ProgressBar from 'react-progressbar.js';
import CircularProgress from 'material-ui/CircularProgress';

export default class SchoolStatsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: 75,
    };
  }

  render() {
    const numberOfTeachers = this.context.myTeachers.length;
    const numberOfStudents = this.context.myStudents.length;
    const numberOfUsers = numberOfTeachers + numberOfStudents;
    const userWheelValue = numberOfUsers / 100;
    const wheelOptions = {
      color: '#00BCD4',
      trailColor: '#eee',
      trailWidth: 1,
      duration: 1400,
      easing: 'bounce',
      strokeWidth: 6,
      from: { color: '#00BCD4', a: 0 },
      to: { color: '#3F51B5', a: 1 },
      step: (state, circle) => {
        circle.path.setAttribute('stroke', state.color);
      },
    };
    return (
      <div className="row center-xs">
        <div className="col-xs-12">
          <div className="row">
            <div className="col-xs-12">
              <br />
              <h2>Users: <span className="lighter-text">{numberOfUsers}/100</span></h2>
            </div>
            <div className="col-xs-12">
              <div className="row middle-xs center-xs">
                <div className="col-xs-9 col-md-4">
                  <ProgressBar.Circle
                    progress={userWheelValue}
                    options={wheelOptions}
                  />
                </div>
                <div className="col-xs-12 col-md-3">
                  <h3>Teachers: <span className="lighter-text">{numberOfTeachers}</span></h3>
                  <br />
                  <h3>Students: <span className="lighter-text">{numberOfStudents}</span></h3>
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
          <br />
          <div className="row">
            <div className="col-xs-12">
              <br />
              <h2>Questions Answered <span className="lighter-text">
                {this.state.completed}/100
              </span></h2>
            </div>
            <div className="col-xs-12">
              <div className="row middle-xs center-xs">
                <div className="col-xs-9 col-md-4">
                  <ProgressBar.Circle
                    progress={this.state.completed / 100}
                    options={wheelOptions}
                  />
                </div>
                <div className="col-xs-4 col-md-3">
                  <h3>Top 10 Responders:</h3>
                  <ol>
                    <li>BOB</li>
                    <li>TIM</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SchoolStatsPage.contextTypes = {
  myTeachers: React.PropTypes.array,
  myStudents: React.PropTypes.array,
};
