import React from 'react';

export const WebhookStatus =  props =>
    <div className="webhook-install-status">
        <span>Статус вебхука: {props.webhookInstallStatus}</span>
    </div>;
