import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Uploader from './uploader';
import SearchView from './search';
import { Segment } from 'semantic-ui-react';

class App extends Component {
  render() {
    /*
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Uploader />
      </div>
      */
    return (
      <Segment.Group textAlign="center" compact={true}>
        <Segment.Group>
        <Segment>CSV Uploader</Segment>
          <Segment>
            <Uploader />
          </Segment>
        </Segment.Group>
        <Segment.Group>
          <Segment>Searcher</Segment>
          <Segment>
            <SearchView />
          </Segment>
        </Segment.Group>
      </Segment.Group>
    );
  }
}

export default App;