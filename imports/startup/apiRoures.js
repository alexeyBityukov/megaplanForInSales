import React from 'react';
import { renderToString } from 'react-dom/server';
import RemoveApp from '../ui/pages/removeApp';
import { errorCodeEmptyQuery, errorCodeEmptyAppSecretKey } from '../api/installApp';
import { Meteor } from 'meteor/meteor';

WebApp.connectHandlers.use('/api/install', (req, res) => {
    Meteor.call('install', req.query.shop, req.query.token, req.query.insales_id, (error) => {
        if(error && error.error === errorCodeEmptyQuery)
            res.writeHead(400);
        else if (error && error.error === errorCodeEmptyAppSecretKey)
            res.writeHead(500);
        else
            res.writeHead(200);
        res.end(Meteor.bindEnvironment(() => {Meteor.call('install', req.query.shop, req.query.token, req.query.insales_id)}));
    });
});

WebApp.connectHandlers.use('/api/remove', (req, res) => {
    Meteor.call('remove', req.query.insales_id);
    res.writeHead(200);
    res.end(renderToString(<RemoveApp inSalesId={req.query.insales_id} />));
});

WebApp.connectHandlers.use('/api/order', function(req, res) {
    const bound = Meteor.bindEnvironment((callback) => {callback();});
    let body = "";

    req.on('data', function (data) {
        body += data;
    });

    req.on('end', function () {
        bound(() => {Meteor.call('webhookController', JSON.parse(body))});
        res.writeHead(200);
        res.end();
    });

});
