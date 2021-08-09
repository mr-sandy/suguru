import React, { Component } from "react";
import {hot} from "react-hot-loader";
// import "./App.css";
import NewGame from "./NewGame";

class App extends Component{
  render(){
    return(
      <div className="App">
        <NewGame />
      </div>
    );
  }
}

export default hot(module)(App);