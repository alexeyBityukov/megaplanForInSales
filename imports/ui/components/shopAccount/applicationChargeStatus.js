import React from 'react';

export const ApplicationChargeStatus = props =>
    <div className="application-charge-status">
        <span className="application-charge-status-label">Оплачено до: </span>
        <span className="application-charge-status-value">{props.status !== undefined && (new Date(props.status)).toLocaleDateString("ru", {year: 'numeric', month: 'long', day: 'numeric'})}</span>
    </div>;