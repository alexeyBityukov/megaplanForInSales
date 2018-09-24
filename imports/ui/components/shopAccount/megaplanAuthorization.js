import React from 'react';

export default props =>
    <div className="megaplan-api-data">
        <form onSubmit={props.onSubmit} >
            <div>
                <label htmlFor="login">Логин</label>
                <input id="login" type="text" defaultValue={props.megaplanApiLogin} autoComplete="false"/>
            </div>
            <div>
                <label htmlFor="password">Пароль</label>
                <input id="password" type="password" defaultValue={props.megaplanApiPassword} autoComplete="false"/>
            </div>
            <div>
                <label htmlFor="baseUrl">Ссылка</label>
                <input id="baseUrl" type="text" defaultValue={props.megaplanApiBaseUrl} autoComplete="false"/>
            </div>
            <div>
                <span>{props.error}</span>
            </div>
            <div>
                <span>{props.status}</span>
            </div>
            <div>
                <button>Обновить</button>
            </div>
        </form>
    </div>