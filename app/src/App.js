// ================
// This is the main file for the interface
// Next components is some plugins to access the DB and style for the interface
// ================

import React, { Component } from 'react';

import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import firebase from './config/Firebase';

class App extends Component {
// ================
// in this constructor method we will tell to the app in each object to store the data from DB
// ================

  constructor(props) {
    super(props);
    this.state = {
      allData: null
    }
  }

  // global variable to use
  distance = 0;
  distanceRelative = 0;

  // when one state is changing this method will run on each modification in DB
  // is connected to the firebase real-time database
  // the values came from the Raspi Pi
  componentDidMount() {
    firebase.database().ref("/").on('value', (snapshot) => {
      this.setState({
        allData: snapshot.val(),
      }, () => {
        this.changeBars();
      })
    });
  }

  // this is for the interface when a value is changing this will change the size
  // and the colors on the bars
  changeBars() {
    if (this.state.allData != null) {
      let barCoDensity = document.getElementById("coDensity");
      barCoDensity.style.width = Math.floor(parseInt(this.state.allData.coDensity) * 2.8 % 100) + "%";

      if (Math.floor(parseInt(this.state.allData.coDensity) * 2.8 % 100) > 25 && Math.floor(parseInt(this.state.allData.coDensity) * 2.8 % 100) < 60) {
        barCoDensity.style.backgroundColor = "orange";
      } else if (Math.floor(parseInt(this.state.allData.coDensity) * 2.8 % 100) < 25){
        barCoDensity.style.backgroundColor = "green";
      } else {
        barCoDensity.style.backgroundColor = "red";
      }

      let barGasDensity = document.getElementById("gasDensity");
      barGasDensity.style.width = Math.floor(parseInt(this.state.allData.gasDensity) / 3 % 100) + "%";

      if (Math.floor(parseInt(this.state.allData.gasDensity) / 2 % 100) > 25 && Math.floor(parseInt(this.state.allData.gasDensity) / 2 % 100) < 60) {
        barGasDensity.style.backgroundColor = "orange";
      } else if (Math.floor(parseInt(this.state.allData.gasDensity) / 2 % 100) < 25) {
        barGasDensity.style.backgroundColor = "green";
      } else {
        barGasDensity.style.backgroundColor = "red";
      }

      let barSmokeDensity = document.getElementById("smokeDensity");
      barSmokeDensity.style.width = Math.floor(parseInt(this.state.allData.smokeDensity) / 2 % 100) + "%";

      if (Math.floor(parseInt(this.state.allData.smokeDensity) / 2 % 100) > 25 && Math.floor(parseInt(this.state.allData.smokeDensity) / 2 % 100) < 60) {
        barSmokeDensity.style.backgroundColor = "orange";
      } else if (Math.floor(parseInt(this.state.allData.smokeDensity) /2 % 100) < 25) {
        barSmokeDensity.style.backgroundColor = "green";
      } else {
        barSmokeDensity.style.backgroundColor = "red";
      }

      let barDistance = document.getElementById("distance");
      barDistance.style.width = Math.floor(parseInt(this.state.allData.distance) % 100) + "%";

      if (Math.floor(parseInt(this.state.allData.barDistance) % 100) > 25 && Math.floor(parseInt(this.state.allData.barDistance) % 100) < 60) {
        barDistance.style.backgroundColor = "orange";
      } else if (Math.floor(parseInt(this.state.allData.barDistance) % 100) < 25) {
        barDistance.style.backgroundColor = "green";
      } else {
        barDistance.style.backgroundColor = "red";
      }
    }
  }


  // this is the main method when app is stating
  // this function return the app
  render() {
    return (
      <div style={{ minWidth: "100%", minHeight: "100%", height: 100 + "%", position: 'fixed', top: 0, left: 0 }}>
        <div className="col-md-6" style={{ minHeight: 100 + "%" }}>
          {
            this.state.allData != null ? (
              <div>
                <div className="col-md-12  bordered">
                  <h5>CO Density: {this.state.allData.coDensity}</h5>
                  <div class="container-bars">
                    <div class="bar html" id="coDensity">{this.state.allData.coDensity}</div>
                  </div>
                  <br />
                  <h5>CO Value: {this.state.allData.coValue}</h5> <br />
                </div>
                <div className="col-md-12  bordered">
                  <h5>Distance: {this.state.allData.distance}</h5> <br />
                  <div class="container-bars">
                    <div class="bar css" id="distance">{this.state.allData.distance}</div>
                  </div>
                </div>
                <div className="col-md-12  bordered">
                  <h5>Gas Density: {parseInt(this.state.allData.gasDensity) / 2 + "%"}</h5> <br />
                  <div class="container-bars">
                    <div class="bar js" id="gasDensity">{parseInt(this.state.allData.gasDensity) / 2 + "%"}</div>
                  </div>
                  <h5>Gas Value: {this.state.allData.gasValue} <br /></h5>
                </div>

                <div className="col-md-12  bordered">
                  <h5>Smoke Density: {this.state.allData.smokeDensity} <br /></h5>
                  <div class="container-bars">
                    <div class="bar php" id="smokeDensity">{this.state.allData.smokeDensity}</div>
                  </div>
                  <h5>smokeValue:{this.state.allData.smokeValue} <br /></h5>
                </div>

                <div className="col-md-12  bordered">
                  If you want to connect only on the video camera, follow this link: <br/>
                  <a href={this.state.allData.httpCamServer}>{this.state.allData.httpCamServer}</a>
                  <br /> <br /> <br />
                  HTTP link for Camera Server: {this.state.allData.httpCamServer} <br />
                </div>
                <div className="col-md-12  bordered">
                  This project was created by:<br/>
                  Iancu George-Alexandru, 
                  Scurtu Dumitru Alexandru & 
                  Benche Mihai <br/>
                  for UnitBV
                </div>
              </div>
            ) : <></>
          }

        </div>
        <div className="col-md-6" style={{ minHeight: 100 + "%", overflowX: 'hidden' }}>
          {this.state.allData != null ?
            (
              <iframe src={this.state.allData.httpCamServer} scrolling="no" frameborder="0"></iframe>
            )
            :
            (
              <></>
            )
          }
        </div>
      </div>
    );
  }
}

export default App;
