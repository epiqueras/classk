import React from 'react';
import ProgressBar from 'react-progressbar.js';

export default class StudentStatsPage extends React.Component {
  render() {
    const wheelOptions = {
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
    let unanswered = 0;
    let questions = 0;
    this.props.assignments.forEach(assignment => {
      unanswered += assignment.unanswered;
      questions += assignment.questions;
    });
    let progress = (questions - unanswered) / questions;
    if (questions === 0) { progress = 1; }
    return (
      <div className="row center-xs">
        <div className="col-xs-12">
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
                    progress={progress}
                    options={wheelOptions}
                    initialAnimate
                    containerStyle={{ fontSize: '10rem' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

StudentStatsPage.propTypes = {
  assignments: React.PropTypes.array,
};

StudentStatsPage.contextTypes = {
  myColors: React.PropTypes.object,
  changeNavbarText: React.PropTypes.func,
};
