import React from 'react';
import { Router, Route, Switch } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import { NotFoundPage } from '../ui/pages/pageNotFound.js';
import { ShopAccount } from '../ui/pages/shopAccount.js';
import { Guide } from '../ui/pages/guide.js';

const browserHistory = createBrowserHistory();

export const renderRoutes = () => (
    <Router history={browserHistory}>
        <Switch>
            <Route exact path="/account" component={ShopAccount}/>
            <Route exact path="/guide" component={Guide}/>
            <Route component={NotFoundPage}/>
        </Switch>
    </Router>
);