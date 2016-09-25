import getMuiTheme from 'material-ui/styles/getMuiTheme';

// This replaces the textColor value on the palette
// and then update the keys for each component that depends on it.
// More on Colors: http://www.material-ui.com/#/customization/colors
const customMuiTheme = getMuiTheme({
  palette: {
    primary1Color: '#303F9F',
    primary2Color: '#3F51B5',
    primary3Color: '#C5CAE9',
    accent1Color: '#00BCD4',
    textColor: '#212121',
    alternateTextColor: '#FFFFFF',
  },
});

export default customMuiTheme;
