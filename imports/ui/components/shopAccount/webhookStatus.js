import React from 'react';

export const WebhookStatus =  props =>
    <div className="webhook-install-status">
        <span className="webhook-install-status-label">Вебхук: </span>
        <span className="webhook-install-status-value">{props.webhookInstallStatus}</span>
    </div>;
