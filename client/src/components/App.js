// Rendering layer control
// aka Rendering routes with React Router

import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
// Connect helper 
import { connect } from 'react-redux';
// Take all the different action creators and define them as actions
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';

const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;

class App extends Component {

  componentDidMount(){
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

// First arg, MapStateToProps, second arg - actions (not assigned to hte app component as props)
export default connect(null, actions)(App);
