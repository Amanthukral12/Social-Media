import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './core/Home';


function MainRouter() {
    return (
        <div>
            <Switch>
                <Route path="/" component={Home}></Route>
            </Switch>
        </div>
    )
}

export default MainRouter
