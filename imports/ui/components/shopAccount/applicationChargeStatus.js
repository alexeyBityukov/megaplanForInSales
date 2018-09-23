import React from 'react';

export default props =>
    <div className="application-charge-status">
        <span>Оплачено до: {props.status}</span>
        {props.error && <span>Ошибка проверки статуса оплаты: {props.error}</span>}
    </div>