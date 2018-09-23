import React from 'react';
import WebhookStatusContainer from '../components/shopAccount/webhookStatusContainer';
import ApplicationChargeStatusContainer from '../components/shopAccount/applicationChargeStatusContainer';
import MegaplanAuthorizationContainer from '../components/shopAccount/megaplanAuthorizationContainer';

export default () =>
    <div className="shop-account">
        <WebhookStatusContainer />
        <ApplicationChargeStatusContainer />
        <MegaplanAuthorizationContainer />
    </div>