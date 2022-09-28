import React from 'react';
import {  Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom';
import About from './About';
import Header from './Header';
import Home from './Home';
import Person from './Person';
import Welcome from './Welcome';

const App = () => {
    return (
        <Router>
            <Header></Header>
            <Switch>
                <Route exact path="/" component={Welcome}></Route>
                <Route path="/home" component={Home}></Route>
                <Route path="/person" component={Person}></Route>
                <Route path="/about" component={About}></Route>
            </Switch>
        </Router>
    );
};

export default App;