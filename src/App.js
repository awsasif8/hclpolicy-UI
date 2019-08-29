import React , {Component} from 'react';
import './App.css';
import {withTranslation} from 'react-i18next';
import { withRouter, HashRouter, Switch, Route } from 'react-router-dom'
import Home from './Components/Home/Home';
import Header from './Components/Header/Header';

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

  render(){
    return (
      <div className="App">  
        <HashRouter>
         <Header redirect={this.redirect}/>
          <Switch> 
             <Route path='/' exact component={Home} /> 
          </Switch>    
        </HashRouter>
      </div>
    );

  }
  
}


export default withTranslation()(App);
