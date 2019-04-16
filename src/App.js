import React, { Component } from 'react';
import axios from "axios";
import Table from "./Table.js";

class App extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
      this.setState({
        data: res.data
      })
    });
  }

  render() {
    return (
      <div className="App">
        <Table list={this.state.data} paginate={5} search={true} />
      </div>
    );
  }
}

export default App;
