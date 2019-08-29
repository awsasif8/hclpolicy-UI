import React, { Component } from 'react'
import config from '../../config.json'
import axios from 'axios'
import { PieChart, Pie,LineChart ,Line ,BarChart, Bar, XAxis, YAxis, Cell, CartesianGrid, Tooltip, Legend } from 'recharts';
import './Trends.css'
export class Trends extends Component {
    constructor(props) {
        super(props)
        this.state = {
            overallList: [],
            latestList:[],
            selectAnalysis: 'day'
        }
    }

    componentDidMount() {
        console.log(this.state)
        axios.get(`${config.url}/trends`)
            .then(res => {
                console.log("res inside component did mount get all day data", res)
                this.setState({
                    overallList: res.data
                }, () => {
                    console.log("overall list after set state", this.state.overallList)
                });
            })
            axios.get(`${config.url}/latesttrends/latest`)
            .then(res => {
                console.log("", res)
                this.setState({
                    latestList: res.data
                }, () => {
                    console.log("overall list after set state", this.state.latestList)
                });
            })
    }
    render() {
        return (
            <div className="chart">
                <br></br>
                    <h3>Overall Trends
                    <button type="button" style={{ marginLeft: "30%" }} className="btn btn-primary" onClick={() => { this.props.history.push('/') }}>Back</button>&nbsp;
                    </h3>
                    <br></br>

                    <BarChart width={1000} height={300} data={this.state.overallList}
                        margin={{ top: 5, right: 30, left: 20, bottom: 100 }}>

                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="policyName" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#8884d8" />
                        {/* <Bar dataKey="crisilRating" stackId="a" fill="#ffffff" /> */}

                    </BarChart>
                    <h3>Latest Trends</h3>
                    <br></br>
                    <LineChart width={1100} height={300} data={this.state.latestList}>
                        <XAxis dataKey="policyName"  />
                        <YAxis />
                        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                        <Line type="monotone" dataKey="percentage" stroke="#8884d8" />
                       
                    </LineChart>

                </div>

        )
    }
}

export default Trends
