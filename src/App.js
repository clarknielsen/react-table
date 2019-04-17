import React, { Component } from 'react';
import axios from "axios";
import "./app.scss";
import Table from "./components/Table.js";

class App extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    // call api
    axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
      this.setState({
        data: res.data
      })
    });
  }

  render() {
    return (
      <div className="App">
        <h1>React Table Example</h1>
        <Table list={this.state.data} paginate={5} />
      </div>
    );
  }
}

export default App;
