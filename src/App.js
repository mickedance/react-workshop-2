import React from 'react';
import {  Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom';
import axios from 'axios';
import About from './About';
import CrudDemo from './CrudDemo';
import Header from './Header';
import Home from './Home';
import Person from './Person';
import Welcome from './Welcome';
import PersonDetails from './PersonDetails';
import Form from './Form';

const App = () => {
    return (
        <Router>
            <Header></Header>
            <Switch>
                <Route exact path="/" component={Welcome}></Route>
                <Route path="/home" component={Home}></Route>
                <Route path="/person" component={Person}></Route>
                <Route path="/about" component={About}></Route>
                <Route path="/crud" component={CrudDemo}></Route>
                <Route path="/form" component={Form}></Route>
                <Route path="/persondetails/:id" component={PersonDetails}></Route>
            </Switch>
        </Router>
    );
};

export default App;