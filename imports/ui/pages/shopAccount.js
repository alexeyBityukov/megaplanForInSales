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
            <div className="insales-statuses">
                <h2>Состояние приложения</h2>
                <WebhookStatusContainer />
                <ApplicationChargeStatusContainer />
            </div>
            <div className="megaplan-settings">
                <h2>Настройки</h2>
                <MegaplanAuthorizationContainer />
                <MegaplanProgramIdContainer />
            </div>
        </div>
        <ShopAccountFooter />
    </div>;
