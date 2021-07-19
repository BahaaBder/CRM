import React, { Component } from "react";

import {
  BarChart,
  CartesianGrid,
  XAxis,
  Tooltip,
  Legend,
  Bar,
  YAxis,
} from "recharts";
const axios = require("axios");
const TOP_OWNERS = "http://localhost:8080/topOwners";
export default class TopEmployees extends Component {
  constructor() {
    super();
    this.state = {
      topThreeOwners: [],
    };
  }
  componentDidMount = () => {
    axios.get(TOP_OWNERS).then((response) => {
      this.setState({ topThreeOwners: response.data });
      console.log(response.data);
    });
  };

  render() {
    return (
      <div>
        <BarChart
          width={600}
          height={300}
          data={this.state.topThreeOwners}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis type="number" dataKey="total" />
          <YAxis type="category" dataKey="owner" />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#8884d8" />
        </BarChart>
      </div>
    );
  }
}
