import React, { Component } from 'react';
import logo from './logo.svg';
import AppRouter from './router/router';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppRouter />
      </div>
    );
  }
}

export default App;
