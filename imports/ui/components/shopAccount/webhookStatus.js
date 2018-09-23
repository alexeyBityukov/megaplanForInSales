import React from 'react';

export default props =>
    <div className="webhook-install-status">
        <span>Статус вебхука: {props.webhookInstallStatus}</span>
    </div>
