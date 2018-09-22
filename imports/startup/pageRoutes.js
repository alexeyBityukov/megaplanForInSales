import React from 'react';
import { Router, Route, Switch } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import NotFoundPage from '../ui/pages/pageNotFound.js';
import ShopAccountContainer from '../ui/components/shopAccountContainer.js';

const browserHistory = createBrowserHistory();

export const renderRoutes = () => (
    <Router history={browserHistory}>
        <Switch>
            <Route exact path="/account" component={ShopAccountContainer}/>
            <Route component={NotFoundPage}/>
        </Switch>
    </Router>
);