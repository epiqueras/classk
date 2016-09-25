import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

export default class SchoolStatsPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      completed: 75,
    };
  }

  render() {
    return (
      <div className="row center-xs">
        <div className="col-xs-12">
          <div className="row">
            <div className="col-xs-12">
              <br />
              <h2>Users {this.state.completed}/100</h2>
            </div>
            <div className="col-xs-12">
              <div className="row middle-xs center-xs">
                <div className="col-xs-12 col-md-4">
                  <CircularProgress mode="determinate" value={this.state.completed} size={5} />
                </div>
                <div className="col-xs-12 col-md-3">
                  <h3>Teachers: 25</h3>
                  <br />
                  <h3>Students: 25</h3>
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
              <h2>Questions Answered {this.state.completed}/100</h2>
            </div>
            <div className="col-xs-12">
              <div className="row middle-xs center-xs">
                <div className="col-xs-12 col-md-4">
                  <CircularProgress mode="determinate" value={this.state.completed} size={5} />
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
