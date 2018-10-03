import React from 'react';
import WebhookStatusContainer from '../components/shopAccount/webhookStatusContainer';
import ApplicationChargeStatusContainer from '../components/shopAccount/applicationChargeStatusContainer';
import MegaplanAuthorizationContainer from '../components/shopAccount/megaplanAuthorizationContainer';
import MegaplanProgramIdContainer from '../components/shopAccount/megaplanProgramIdContainer';
import { ShopAccountHeader } from '../components/shopAccount/shopAccountHeader';
import { ShopAccountFooter } from '../components/shopAccount/shopAccountFooter';

export const ShopAccount = () =>
    <div className="shop-account">
        <ShopAccountHeader />
        <div className="shop-account-content">
            <WebhookStatusContainer />
            <ApplicationChargeStatusContainer />
            <MegaplanAuthorizationContainer />
            <MegaplanProgramIdContainer />
        </div>
        <ShopAccountFooter />
    </div>;
