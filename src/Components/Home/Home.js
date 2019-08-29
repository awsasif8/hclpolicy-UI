import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import { withTranslation } from 'react-i18next';

export class Home extends Component {
    constructor(props){
        super(props)
    }
    render() {
        let { t } = this.props;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="btn-group btn-group-lg col-md-8" style={{marginTop: "10%"}} >
                        <button type="button" className="btn btn-primary" onClick={()=>{this.props.history.push('/policyList')}}>{t('policylist')}</button>&nbsp;
                        <button type="button" className ="btn btn-primary" onClick={()=>{this.props.history.push('/suggested')}}>{t('suggestedlist')}</button>&nbsp;
                        <button type="button" className ="btn btn-primary" onClick={()=>{this.props.history.push('/trends')}}>{t('trends')}</button>
                        
                    </div>
                    <div class="col-md-2"></div>
                </div>
            </div>
        )
    }
}

export default withTranslation()(Home)
