import React, { Component } from 'react';
import logo from './logo.svg';
import csv_logo from './export_csv-512.png';
import './App.css';
import Uploader from './uploader';
import SearchView from './search';
import { Segment } from 'semantic-ui-react';

class App extends Component {
  render() {
    return (
      <Segment.Group  compact={false} style={{maxWidth: '600px'}}>
        <Segment.Group>
          <Segment textAlign="center">
            <h1>CSV Uploader</h1>
          <img src={csv_logo} className="App-logo" alt="logo" />
          </Segment>
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