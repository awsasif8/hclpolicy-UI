import React , {Component} from 'react';
import './App.css';
import {withTranslation} from 'react-i18next';
import { withRouter, HashRouter, Switch, Route } from 'react-router-dom'
import Home from './Components/Home/Home';
import Header from './Components/Header/Header';
import PolicyList from './Components/PolicyList/Policylist';
import BuyPolicy from './Components/BuyPolicy/BuyPolicy';
import Trends from './Components/Trends/Trends';
import Suggested from './Components/Suggested/Suggested';

class App extends Component {
  constructor(props) {
    super(props);
    const { i18n } = this.props;
    i18n.changeLanguage('en');
    this.state={
      isLoggedIn: false,
      data:{}
    }
  }
  redirect=(page, history)=> {
    history.push(page);
  }

  validateUser = (isLoggedIn)=> {
    this.setState({isLoggedIn});
  }
  getuserData =(data,props)=>{
    this.setState({data});
    console.log(data);
  }
  render(){
    return (
      <div className="App">  
        <HashRouter>
         <Header redirect={this.redirect}/>
          <Switch> 
             <Route path='/' exact component={Home} /> 
             <Route path='/policyList' exact component={PolicyList} /> 
             <Route path='/buypolicy' exact component={BuyPolicy} /> 
             <Route path='/trends' exact component={Trends} /> 
             <Route path='/suggested' exact component={Suggested} /> 

          </Switch>    
        </HashRouter>
      </div>
    );

  }
  
}


export default withTranslation()(App);
