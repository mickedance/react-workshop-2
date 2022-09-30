import React from 'react';
import {  Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom';
import DemoRouter from './DemoRouter';

const App = () => {
    return (
        <Router>
            <Header></Header>
            <DemoRouter></DemoRouter>
        </Router>
    );
};

export default App;