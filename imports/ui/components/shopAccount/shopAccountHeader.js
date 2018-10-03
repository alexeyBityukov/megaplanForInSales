import React from 'react';
import ButtonBackToInSales from './buttonBackToInSales';

export const ShopAccountHeader = () =>
    <header className="shop-account-header">
        <HeaderLeftBlock />
        <HeaderCenterBlock />
        <HeaderRightBlock />
    </header>;

const HeaderLeftBlock = () =>
    <div className="left-block header-block">
        <ButtonBackToInSales />
    </div>;

        const HeaderCenterBlock = () =>
    <div className="logo header-block">
        <a href="https://megaplan.ru/" title="Мегаплан">
            <img className="logo-img" src="https://megaplan.ru/local/templates/main_template/img/logo-black.svg" alt="Мегаплан" />
        </a>
    </div>;

const HeaderRightBlock = () =>
    <div className="right-block">
        <a className="support-email" href="mailto:alex.bityuckov@gmail.com">
            <span className="support-email">alex.bityuckov@gmail.com</span>
        </a>
        <a className="support-email" href="mailto:alex.bityuckov@gmail.com">
            <span className="button-error-report">Сообщить о ошибке</span>
        </a>
    </div>;