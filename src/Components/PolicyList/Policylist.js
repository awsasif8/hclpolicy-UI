import React, { Component } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from 'axios'
import config from '../../config.json'
import './PolicyList.css'
export class PolicyList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            policyList: [],
            // policyList: [{
            //     policyId: 1,
            //     policyName: "LIC Jeevan Akshay VI",
            //     policyPrice: 100000
            // }, {
            //     policyId: 2,
            //     policyName: "LIC e-Term Plan",
            //     policyPrice: 300000

            // }
            // ],
            // policyListDetailed: [{
            //     policyId: 1,
            //     policyFeatures: "Differential premium rates for Smoker/Non-Smoker lives.Application of own life ONLY will be considered.Minimum Basic Sum Assured should be Rs. 25, 00,000 for Aggregate category and for Non-smoker category it should be Rs. 50, 00,000. There is no upper limit for Maximum Basic Sum Assured.Covers broad range of age group – Form 18 years to 60 years",
            //     terms:{
            //         sumAssured: "2500000",
            //         modeOfPremium: "Yearly"
            //     }
            // }, {
            //     policyId: 2,
            //     policyFeatures: "Differential premium rates for Smoker/Non-Smoker lives.Application of own life ONLY will be considered.Minimum Basic Sum Assured should be Rs. 25, 00,000 for Aggregate category and for Non-smoker category it should be Rs. 50, 00,000. There is no upper limit for Maximum Basic Sum Assured.Covers broad range of age group – Form 18 years to 60 years",
            //     terms:{
            //         sumAssured: "2500000",
            //         modeOfPremium: "Yearly"
            //     }
            // }
            // ],
            policyListDetailed: [],
            policyId: '',
            policyName: '',
            proceedbuy: false

        }
        this.onClickAccordion = this.onClickAccordion.bind(this)
        this.handleBuy = this.handleBuy.bind(this)
        this.handleClickAnalysis = this.handleClickAnalysis.bind(this)
        // this.onFormSubmit = this.onFormSubmit.bind(this)
        // this.onChange = this.onChange.bind(this)
        // this.fileUpload = this.fileUpload.bind(this)
    }
    handleClickAnalysis(e) {
        e.preventDefault();
        this.props.history.push('/analysis')

    }
    componentDidMount() {
        axios.get(`${config.urlSharath}/policies`)
            .then(res => {
                console.log("res inside on clicked accordion", res)
                if (res.status === 200 && res.data.status === "SUCCESS") {
                    console.log("inside success")
                    this.setState({
                        policyList: res.data.data
                    }, () => {

                    });
                } else {

                }
            }).catch(err => {

            })
    }
    handleBuy(e, item) {
        this.props.history.push({
            pathname: '/buypolicy',
            search: '?query=policyBuy',
            state: { policyId: item.policyId }
        })
    }
    onClickAccordion(e, item) {
        console.log(item)
        // this.setState({
        //     policyList: this.state.policyListDetailed
        // })
        axios.get(`${config.urlSharath}/policies/${item.policyId}`)
            .then(res => {
                console.log("res inside on clicked accordion", res)

                console.log("inside success", res.data)
                this.setState({
                    policyListDetailed: res.data
                });
                console.log("After set state")

            }).catch(err => {

            })

    }
    render() {
        let policyListD = []
        console.log("new list", this.state.policyListDetailed)
        policyListD.push(this.state.policyListDetailed)
        console.log("policylistd", policyListD)

        let policyDetailedList = policyListD.map((item, i) => {
            console.log("darsana",item)

            // let termsList = item['terms'].map((each, i) => {
            //     return (
            //         <div>

            //             <p>Tax Benefit: {each.taxBenefit}</p>
            //             <p>Entry Limit: {each.entryLimit}</p>
            //         </div>

            //     )
            // }, this);

            // console.log("item", item)
            return (
                <div>

                    <p style={{ fontWeight: "bold" , color: "blue"}}>Sum Assured {item.sumAssured}</p>
                    <p style={{ fontWeight: "bold" , color: "blue"}}>Benefits</p>
                    <p >{item.benefits}</p>
                    <p style={{ fontWeight: "bold" , color: "blue"}}>Features</p>
                    <p>{item.features}</p>
                    <p style={{ fontWeight: "bold" , color: "blue"}}>policy Price: {item.policyPrice} &nbsp;&nbsp; <Button onClick={(e) => this.handleBuy(e, item)}>Opt</Button> </p>
                    <p style={{ fontWeight: "bold", color: "red" }}>Terms & Conditions</p>
                    <p > Tax Benefit : {item.taxBenefit}</p>
                    <p > Entry Limit : {item.entryLimit}</p>
                </div>
            )
        }, this);
        let policyList = this.state.policyList.map((item, i) => {
            console.log("item", item)
            return (
                <Card>
                    <Accordion.Toggle className="prodheading" onClick={(e) => { this.onClickAccordion(e, item) }} as={Card.Header} eventKey={item.policyId}>
                        <p style={{fontSize: "1em", color: "grey"}}>{item.policyName} &nbsp;&nbsp; Price: {item.policyPrice}&nbsp;&nbsp; Sum Assured: {item.sumAssured}</p>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={item.policyId}>
                        <Card.Body>
                            {policyDetailedList}

                        </Card.Body>
                    </Accordion.Collapse>
                    {/* <Button onClick={this.handleBuy}>Buy</Button> */}
                </Card>
                // <option key={i} value={item.policy}>{item.stockName}</option>
            )
        }, this);

        return (
            <div >
                <br></br><br></br>
                <h3>
                    Avaliable Policies
                    <button type="button" style={{ marginLeft: "30%" }} className="btn btn-primary" onClick={() => { this.props.history.push('/suggestedList') }}>Suggested Policies</button>&nbsp;
                </h3>
                <div className="policyAccordion">
                    <Accordion >
                        {policyList}
                    </Accordion>
                </div>

            </div>

        )
    }
}

export default PolicyList
