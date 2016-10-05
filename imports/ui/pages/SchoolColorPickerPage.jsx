import React from 'react';
import Alert from 'react-s-alert';
import RaisedButton from 'material-ui/RaisedButton';
import { CirclePicker } from 'react-color';
import Subheader from 'material-ui/Subheader';

import colorPalette from '../stylesheets/colorPalette.jsx';

import { changeColors } from '../../api/schools/methods.js';

export default class SchoolColorPickerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setPrimaryColor: '',
      setAccentColor: '',
      primaryColors: '',
      accentColor: '',
    };
    this.handlePrimaryChange = this.handlePrimaryChange.bind(this);
    this.handleAccentChange = this.handleAccentChange.bind(this);
    this.revertToDefault = this.revertToDefault.bind(this);
    this.saveColors = this.saveColors.bind(this);
  }

  handlePrimaryChange(color) {
    const primaryColorsArray = [
      { primary1Color: '#D32F2F', primary2Color: '#F44336', primary3Color: '#FFCDD2' },
      { primary1Color: '#C2185B', primary2Color: '#E91E63', primary3Color: '#F8BBD0' },
      { primary1Color: '#7B1FA2', primary2Color: '#9C27B0', primary3Color: '#E1BEE7' },
      { primary1Color: '#512DA8', primary2Color: '#673AB7', primary3Color: '#D1C4E9' },
      { primary1Color: '#303F9F', primary2Color: '#3F51B5', primary3Color: '#C5CAE9' },
      { primary1Color: '#1976D2', primary2Color: '#2196F3', primary3Color: '#BBDEFB' },
      { primary1Color: '#0288D1', primary2Color: '#03A9F4', primary3Color: '#B3E5FC' },
      { primary1Color: '#0097A7', primary2Color: '#00BCD4', primary3Color: '#B2EBF2' },
      { primary1Color: '#00796B', primary2Color: '#009688', primary3Color: '#B2DFDB' },
      { primary1Color: '#388E3C', primary2Color: '#4CAF50', primary3Color: '#C8E6C9' },
      { primary1Color: '#689F38', primary2Color: '#8BC34A', primary3Color: '#DCEDC8' },
      { primary1Color: '#AFB42B', primary2Color: '#CDDC39', primary3Color: '#F0F4C3' },
      { primary1Color: '#FBC02D', primary2Color: '#FFEB3B', primary3Color: '#FFF9C4' },
      { primary1Color: '#FFA000', primary2Color: '#FFC107', primary3Color: '#FFECB3' },
      { primary1Color: '#F57C00', primary2Color: '#FF9800', primary3Color: '#FFE0B2' },
      { primary1Color: '#E64A19', primary2Color: '#FF5722', primary3Color: '#FFCCBC' },
      { primary1Color: '#5D4037', primary2Color: '#795548', primary3Color: '#D7CCC8' },
      { primary1Color: '#455A64', primary2Color: '#607D8B', primary3Color: '#CFD8DC' },
    ];
    const chosenColors = primaryColorsArray.find(colorsObject => (
      colorsObject.primary2Color.toLowerCase() === color.hex
    ));
    if (!chosenColors) {
      Alert.error('Invalid color');
      return;
    }
    this.setState({ primaryColors: chosenColors });
    this.setState({ setPrimaryColor: color.hex });
    this.context.setTestPrimaryColors(chosenColors);
  }

  handleAccentChange(color) {
    const accentColorsArray = [
      { chosenColor: '#F44336', accent1Color: '#FF5252' },
      { chosenColor: '#E91E63', accent1Color: '#FF4081' },
      { chosenColor: '#9C27B0', accent1Color: '#E040FB' },
      { chosenColor: '#673AB7', accent1Color: '#7C4DFF' },
      { chosenColor: '#3F51B5', accent1Color: '#536DFE' },
      { chosenColor: '#2196F3', accent1Color: '#448AFF' },
      { chosenColor: '#03A9F4', accent1Color: '#03A9F4' },
      { chosenColor: '#00BCD4', accent1Color: '#00BCD4' },
      { chosenColor: '#009688', accent1Color: '#009688' },
      { chosenColor: '#4CAF50', accent1Color: '#4CAF50' },
      { chosenColor: '#8BC34A', accent1Color: '#8BC34A' },
      { chosenColor: '#CDDC39', accent1Color: '#CDDC39' },
      { chosenColor: '#FFEB3B', accent1Color: '#FFEB3B' },
      { chosenColor: '#FFC107', accent1Color: '#FFC107' },
      { chosenColor: '#FF9800', accent1Color: '#FF9800' },
      { chosenColor: '#FF5722', accent1Color: '#FF5722' },
      { chosenColor: '#795548', accent1Color: '#795548' },
      { chosenColor: '#607D8B', accent1Color: '#607D8B' },
    ];
    const colorAccent = accentColorsArray.find(colorsObject => (
      colorsObject.chosenColor.toLowerCase() === color.hex
    )).accent1Color;
    if (!colorAccent) {
      Alert.error('Invalid color');
      return;
    }
    this.setState({ setAccentColor: color.hex });
    this.setState({ accentColor: colorAccent });
    this.context.setTestAccentColor(colorAccent);
  }

  revertToDefault() {
    const primaryDefaults = {
      primary1Color: colorPalette.primary1Color,
      primary2Color: colorPalette.primary2Color,
      primary3Color: colorPalette.primary3Color,
    };
    this.setState({ primaryColors: primaryDefaults });
    this.setState({ setPrimaryColor: '' });
    this.context.setTestPrimaryColors(primaryDefaults);

    this.setState({ accentColor: colorPalette.accent1Color });
    this.setState({ setAccentColor: '' });
    this.context.setTestAccentColor(colorPalette.accent1Color);
  }

  saveColors() {
    if (!this.state.primaryColors || !this.state.accentColor) {
      Alert.error('Colors not selected.');
      return;
    }
    const colors = {
      primary1Color: this.state.primaryColors.primary1Color,
      primary2Color: this.state.primaryColors.primary2Color,
      primary3Color: this.state.primaryColors.primary3Color,
      accent1Color: this.state.accentColor,
    };
    changeColors.call({ colors }, (error) => {
      if (error) {
        Alert.error(error.reason);
      } else {
        Alert.success('Colors saved!');
        this.setState({ primaryColors: '' });
        this.setState({ setPrimaryColor: '' });
        this.context.setTestPrimaryColors('');
        this.setState({ accentColor: colorPalette.accent1Color });
        this.setState({ setAccentColor: '' });
        this.context.setTestAccentColor('');
      }
    });
  }

  render() {
    return (
      <div className="row center-xs middle-xs">
        <div className="col-xs-12">
          <h2>Your School Colors</h2>
        </div>
        <br /><br /><br /><br />
        <div style={{ marginTop: '20px' }}>
          <CirclePicker
            color={this.state.setPrimaryColor}
            onChangeComplete={this.handlePrimaryChange}
          />
        </div>
        <div className="col-xs-12">
          <Subheader>
            Primary Color
          </Subheader>
        </div>
        <div style={{ marginTop: '40px' }}>
          <CirclePicker
            color={this.state.setAccentColor}
            onChangeComplete={this.handleAccentChange}
          />
        </div>
        <div className="col-xs-12">
          <Subheader>
            Accent Color
          </Subheader>
        </div>
        <div className="col-xs-12">
          <div className="row" style={{ marginTop: '50px' }}>
            <div className="col-xs-6">
              <RaisedButton label="Revert to Default" onTouchTap={this.revertToDefault} />
            </div>
            <div className="col-xs-6">
              <RaisedButton label="Save Colors" secondary onTouchTap={this.saveColors} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SchoolColorPickerPage.contextTypes = {
  setTestPrimaryColors: React.PropTypes.func,
  setTestAccentColor: React.PropTypes.func,
};
