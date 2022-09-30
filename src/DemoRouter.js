import React from 'react';
import {  Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom';
import PersonTable from './PersonTable';
import About from './About';
import Header from './Header';
import Home from './Home';
import Person from './Person';
import Welcome from './Welcome';
import PersonDetails from './PersonDetails';
import Form from './Form';
import CrudDemo from './CrudDemo';

const DemoRouter = () => {
    return (
        <Switch>
                <Route exact path="/" component={Welcome}></Route>
                <Route path="/home" component={Home}></Route>
                <Route path="/person" component={Person}></Route>
                <Route path="/about" component={About}></Route>
                <Route path="/crud" component={CrudDemo}></Route>
                <Route path="/form" component={Form}></Route>
                <Route path="/persondetails/:id" component={PersonDetails}></Route>
            </Switch>
    );
};

export default DemoRouter;