import React from 'react';
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';

const HomePage = () => (
  <div className="row middle-xs center-xs" style={{ height: '100vh' }}>
    <div className="col-xs-12">
      <img
        style={{
          borderRadius: '45px',
          width: '30%',
          marginTop: '-100px',
        }}
        src="classk-image.png"
        alt="Classk Logo"
      />
      <div className="col-xs-12">
        <Subheader>Beta</Subheader>
        <Subheader>
          <a href="mailto:beta@classk.me?subject=Beta%20Invite">
            <FlatButton label="Get a School Account" primary />
          </a>
        </Subheader>
      </div>
    </div>
  </div>
);

export default HomePage;
