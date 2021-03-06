import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import SmurfForm from "./components/SmurfForm";
import Smurfs from "./components/Smurfs";
import { Route, NavLink } from "react-router-dom";
import Smurf from "./components/Smurf";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: []
    };
  }
  componentDidMount() {
    this.getSmurfs();
  }
  getSmurfs = () => {
    axios
      .get("http://localhost:3333/smurfs")
      .then(res => this.setState({ smurfs: res.data }))
      .catch(err => console.log(err));
  };
  deleteSmurf = id => {
    axios
      .delete(`http://localhost:3333/smurfs/${id}`)
      .then(res => {
        this.setState({ smurfs: res.data });
      })
      .catch(err => console.log(err));
  };

  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  render() {
    return (
      <div className="App">
        <NavBar />
        <Route
          exact
          path="/"
          render={props => (
            <Smurfs
              {...props}
              smurfs={this.state.smurfs}
              deleteSmurf={this.deleteSmurf}
            />
          )}
        />
        <Route
          path="/smurf-form"
          render={props => <SmurfForm {...props} getSmurfs={this.getSmurfs} />}
        />
        <Route path="/smurfs/:id" component={Smurf} />
      </div>
    );
  }
}

const NavBar = e => {
  return (
    <header>
      <NavLink exact to="/">
        Home
      </NavLink>
      <NavLink to="/smurf-form">Add</NavLink>
    </header>
  );
};

export default App;
