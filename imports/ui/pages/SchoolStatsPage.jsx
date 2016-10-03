import React from 'react';
import ProgressBar from 'react-progressbar.js';

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
    const userWheelOptions = {
      color: '#aaa',
      // This has to be the same size as the maximum width to
      // prevent clipping
      strokeWidth: 4,
      trailWidth: 1,
      easing: 'easeInOut',
      duration: 1400,
      text: {
        autoStyleContainer: true,
        size: 250,
      },
      from: { color: this.context.myColors.accent1Color, width: 1 },
      to: { color: this.context.myColors.primary2Color, width: 4 },
      // Set default step function for all animate calls
      step: (state, circle) => {
        circle.path.setAttribute('stroke', state.color);
        circle.path.setAttribute('stroke-width', state.width);
        const value = Math.round(circle.value() * 100);
        circle.setText(`${value}/${100}`);
      },
    };
    const answeredWheelOptions = {
      color: '#aaa',
      // This has to be the same size as the maximum width to
      // prevent clipping
      strokeWidth: 4,
      trailWidth: 1,
      easing: 'easeInOut',
      duration: 1400,
      text: {
        autoStyleContainer: true,
        size: 250,
      },
      from: { color: this.context.myColors.accent1Color, width: 1 },
      to: { color: this.context.myColors.primary2Color, width: 4 },
      // Set default step function for all animate calls
      step: (state, circle) => {
        circle.path.setAttribute('stroke', state.color);
        circle.path.setAttribute('stroke-width', state.width);
        const value = Math.round(circle.value() * 100);
        circle.setText(`${value}%`);
      },
    };
    return (
      <div className="row center-xs">
        <div className="col-xs-12">
          <div className="row">
            <div className="col-xs-12">
              <br />
              <h2>Users</h2>
            </div>
            <div className="col-xs-12">
              <div className="row middle-xs center-xs">
                <div className="col-xs-9 col-md-4">
                  <ProgressBar.Circle
                    progress={userWheelValue}
                    options={userWheelOptions}
                    initialAnimate
                    containerStyle={{ fontSize: '8rem' }}
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
              <h2>Questions Answered</h2>
            </div>
            <div className="col-xs-12">
              <div className="row middle-xs center-xs">
                <div className="col-xs-9 col-md-4">
                  <ProgressBar.Circle
                    progress={this.state.completed / 100}
                    options={answeredWheelOptions}
                    initialAnimate
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
  myColors: React.PropTypes.object,
};
