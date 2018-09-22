import React from 'react';
import WebhookStatusContainer from '../components/shopAccount/webhookStatusContainer.js';
import ApplicationChargeStatusContainer from '../components/shopAccount/applicationChargeStatusContainer.js';

export default () =>
    <div className="shop-account">
        <WebhookStatusContainer />
        <ApplicationChargeStatusContainer />
    </div>