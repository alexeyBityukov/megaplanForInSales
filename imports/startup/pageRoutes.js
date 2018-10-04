import React from 'react';
import { Router, Route, Switch } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import { NotFoundPage } from '../ui/pages/pageNotFound.js';
import { ShopAccount } from '../ui/pages/shopAccount.js';

const browserHistory = createBrowserHistory();

export const renderRoutes = () => (
    <Router history={browserHistory}>
        <Switch>
            <Route exact path="/account" component={ShopAccount}/>
            <Route component={NotFoundPage}/>
        </Switch>
    </Router>
);