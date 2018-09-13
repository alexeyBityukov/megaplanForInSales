import React from 'react';
import { Router, Route, Switch } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import InstallApp from '../ui/pages/InstallApp.js';
import NotFoundPage from '../ui/pages/NotFoundPage.js';

const browserHistory = createBrowserHistory();

export const renderRoutes = () => (
    <Router history={browserHistory}>
        <Switch>
            <Route exact path="/install" component={InstallApp}/>
            <Route component={NotFoundPage}/>
        </Switch>
    </Router>
);