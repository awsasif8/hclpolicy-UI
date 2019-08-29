import React, { Component } from 'react'
import axios from 'axios'
import config from '../../config.json'
import { withRouter } from 'react-router-dom';
import './BuyPolicy.css'
const SweetAlert = require('react-bootstrap-sweetalert');

export class BuyPolicy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            emailError: '',
            policyId: '',
            policyIdError: '',
            name: '',
            nameError: '',
            sapId: '',
            sapIdError: '',
            alert: null,
            policyFor: '',
            policyForError:'',
            relationship: '',
            relationshipError:'',
            dependentRelation: '',

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleBuy = this.handleBuy.bind(this);
    }
    componentDidMount() {
        let policyId = this.props.location.state.policyId ? this.props.location.state.policyId : ''
        this.setState({
            policyId: policyId
        })
        console.log("policy id after set state", policyId)
    }
    handleChange(e) {
        this.setState({ [e.target.id]: e.target.value }, () => {

        });

    }

    handleBuy(e) {
        e.preventDefault()
        this.validate().then((res) => {
            console.log("res", res)
            if (res) {
                const { policyId, email, name, sapId } = this.state
                const policy = {
                    policyId: policyId,
                    name: name,
                    email: email,
                    sapId: sapId
                };
                this.props.history.push({
                                pathname: '/policyList',
                            })
                console.log("policy details for buy", policy)
                alert('Your policy request has been submitted successfully.')
                // this.getData(policy).then((response) => {
                //     if (response.status === 200 && response.data.status === "SUCCESS") {
                //         console.log(response.data)
                //         alert(response.data.message)

                //         this.props.history.push({
                //             pathname: '/policyList',
                //         })
                //     } else {
                //     }
                // }).catch((err) => {
                //     alert("Error while buying policy.. Please try again later")
                    // console.log("Inside error")
                    // const getAlert = () => (
                    //     <SweetAlert
                    //         title="Error in buying the policy !"
                    //         confirmBtnBsStyle="success"
                    //         onConfirm={() => hideAlert()}
                    //     >
                    //     </SweetAlert>
                    // );
                    // this.setState({
                    //     alert: getAlert()
                    // });

                    // const hideAlert = () => {
                    //     console.log('Hiding alert...');
                    //     this.setState({
                    //         alert: null
                    //     });
                    //     this.props.history.push('/policyList')
                    // }

                // })
            }
        });
    }


    getData(policy) {
        // let res={
        //     status: 200,
        //     data: {
        //         status: "SUCCESS",
        //         roleId: 3
        //     }
        // }
        return new Promise((resolve, reject) => {
            axios.post(`${config.url}/buy`, policy)
                .then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
        });

    }
    validate() {
        return new Promise((resolve, reject) => {
            console.log("Inside validate")
            let isValid = true;
            const errors = {
                ageError: '',
                nameError: '',
                emailError: '',
                sapIdError: ''
            }

            if (this.state.email.indexOf('@') !== -1 || this.state.email !== '') {
            } else {
                isValid = false;
                errors.nameError = 'Email Id is mandatory and should be in proper format'
            }
            if (this.state.email === '' && this.state.name === '' && this.state.sapId === '') {
                isValid = false;
                errors.nameError = 'Name, emailId and SAP ID are mandatory fields'
            }
            // if (this.state.sapId.length !== 6 || this.state.sapId !== '') {
            // } else {
            //     isValid = false;
            //     errors.sapIdError = 'SAP Id is mandatory must be 6 digits'
            // }

            this.setState({
                ...this.state,
                ...errors
            })
            console.log("isValid inside validate", isValid)
            return resolve(isValid);
            // return Promise.resolve(true)


        })

    }
    render() {
        return (
            <div className="container">

                <form>
                    <span className="pull-right text-danger " ><small>{this.state.nameError}</small></span>
                    <span className="pull-right text-danger " ><small>{this.state.emailError}</small></span>
                    <span className="pull-right text-danger " ><small>{this.state.sapIdError}</small></span>
                    <div className="form-group row">
                        <br></br>
                        <label htmlFor="name" className="col-sm-2 col-form-label labelal " >Name</label>
                        <div className="col-sm-4  ">
                            <input type="text" onChange={this.handleChange} className="form-control" id="name" placeholder="Enter the name" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <br></br>
                        <label htmlFor="sapid" className="col-sm-2 col-form-label labelal " >SAP Id</label>
                        <div className="col-sm-4  ">
                            <input type="text" onChange={this.handleChange}className="form-control" id="sapId" placeholder="Enter SAP Id" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <br></br>
                        <label htmlFor="email" className="col-sm-2 col-form-label labelal">Email</label>
                        <div className="col-sm-4 " >
                            <input type="email" onChange={this.handleChange} className="form-control" id="email" placeholder="Enter email" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <br></br>
                        <label htmlFor="policyFor" className="col-sm-2 col-form-label labelal">Policy For</label>
                        <div className="col-sm-4 " >
                            <select id="policyFor" className="form-control" onChange={this.onChange}>
                                <option value="self">Self</option>
                                <option value="others">Others</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <br></br>
                        <label htmlFor="dependentRelation" className="col-sm-2 col-form-label labelal">Relationship with dependent</label>
                        <div className="col-sm-4 " >
                            <select id="dependentRelation" className="form-control" onChange={this.onChange}>
                                <option value="father">Father</option>
                                <option value="mother">Mother</option>
                                <option value="daughter">Daughter</option>
                                <option value="son">Son</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group row">
                        <div className="col-sm-4 offset-sm-4">
                            <button onClick={this.handleBuy} type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </form>
                {this.state.alert}
            </div>

        )
    }
}
export default BuyPolicy