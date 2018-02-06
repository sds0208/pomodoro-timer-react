import React, { Component } from 'react';
import * as firebase from 'firebase';
import logo from './logo.svg';
import './App.css';
import Timer from './Components/Timer/Timer.js';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDmijLWiDm49W-pvRtWUamTfxT7wrTj1nA",
  authDomain: "bloctime-8025f.firebaseapp.com",
  databaseURL: "https://bloctime-8025f.firebaseio.com",
  projectId: "bloctime-8025f",
  storageBucket: "bloctime-8025f.appspot.com",
  messagingSenderId: "306578503486"
};
firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
        < Timer />
      </div>
    );
  }
}

export default App;
