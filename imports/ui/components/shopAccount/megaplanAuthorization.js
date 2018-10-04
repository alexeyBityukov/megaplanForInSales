import React from 'react';

export const MegaplanAuthorization = props =>
    <div className="megaplan-api-data">
        <form onSubmit={props.onSubmit} >
            <div className="flex">
                <label htmlFor="login">Логин от megaplan: </label>
                <input id="login" type="text" defaultValue={props.megaplanApiLogin} autoComplete="false"/>
            </div>
            <div className="flex">
                <label htmlFor="password">Пароль от megaplan: </label>
                <input id="password" type="password" defaultValue={props.megaplanApiPassword} autoComplete="false"/>
            </div>
            <div className="flex">
                <label htmlFor="baseUrl">Ссылка на аккаунт: </label>
                <input id="baseUrl" type="text" defaultValue={props.megaplanApiBaseUrl} autoComplete="false"/>
            </div>
            <div className="message-megaplan-authorization stable-height">
                {props.error !== undefined ? <span>{'* ' + props.error}</span>: props.status !== undefined &&  <span>{'* ' + props.status}</span>}
            </div>
            <div className="flex">
                <button className="update-authorization-data">Сохранить настройки входа</button>
            </div>
        </form>
    </div>;
