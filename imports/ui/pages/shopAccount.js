import React from 'react';
import WebhookStatusContainer from '../components/shopAccount/webhookStatusContainer.js';
import ApplicationChargeStatusContainer from '../components/shopAccount/applicationChargeStatusContainer.js';
import MegaplanAuthorization from '../components/shopAccount/megaplanAuthorization.js';

export default () =>
    <div className="shop-account">
        <WebhookStatusContainer />
        <ApplicationChargeStatusContainer />
        <MegaplanAuthorization />
    </div>