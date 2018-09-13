import React from 'react';
import { Router, Route, Switch } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import InstallApp from '../ui/pages/InstallApp.js';
import NotFoundPage from '../ui/pages/NotFoundPage.js';
import ShopAccount from '../ui/pages/ShopAccount.js';

const browserHistory = createBrowserHistory();

export const renderRoutes = () => (
    <Router history={browserHistory}>
        <Switch>
            <Route exact path="/install" component={InstallApp}/>
            <Route exact path="/account" component={ShopAccount}/>
            <Route component={NotFoundPage}/>
        </Switch>
    </Router>
);