import React, { Component } from 'react';

// Material-UI
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

// Theme
import { deepOrange500 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Font
import 'typeface-roboto';

import { loadMarkers } from './service';

// Map
import Map from './map';

// Click handler
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


// Styles
const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200
  }
}

// Theme
const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500
  }
})

class App extends Component {
  constructor (props, context) {
    super(props, context)

    // Default text
    this.state = {
      text: 'Sample text'
    }
  }

  onMarkerClick(props) {
    console.log('Marker Clicked', props);
  }

  componentWillMount() {
    loadMarkers();
  }

  onSubmit = e => {
    // No real submit
    e.preventDefault()

    // Get input value
    const text = this.refs.cool_text.input.value

    // Set state
    this.setState({
      text
    })

    // Do something with text
    alert(`You said : ${text}`)
  }

  render () {
    console.log(process.env);
    // console.log(config.error);
    // console.log(config.parsed);
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
          <h1>HammApp</h1>
          <h2>Find the perfect spot for your HammBag</h2>

          <Map onMarkerClick={this.onMarkerClick} />

          <form onSubmit={this.onSubmit}>
            <TextField
              ref='cool_text'
              floatingLabelText='Say something cool!'
              defaultValue={this.state.text}
            />
            <br />
            <RaisedButton type='submit' label='Submit' primary />
          </form>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
