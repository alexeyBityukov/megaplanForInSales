import React from 'react';
import { renderToString } from 'react-dom/server';
import InstallApp from '../ui/pages/installApp.js';
import { errorCodeEmptyQuery, errorCodeEmptyAppSecretKey } from '../api/installApp.js';

WebApp.connectHandlers.use('/install', (req, res, next) => {
    Meteor.call('install', req.query.shop, req.query.token, req.query.insales_id, (error) => {
        if(error && error.error === errorCodeEmptyQuery)
            res.writeHead(400);
        else if (error && error.error === errorCodeEmptyAppSecretKey)
            res.writeHead(500);
        else
            res.writeHead(200);
        res.end(renderToString(<InstallApp inSalesId={req.query.insales_id} shop={req.query.shop} token={req.query.token} errorCode={error && error.error} errorMessage={error && error.error && error.reason}/>));
    });
});

