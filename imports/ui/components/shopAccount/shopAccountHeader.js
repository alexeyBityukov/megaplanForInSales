import React from 'react';

export const ShopAccountHeader = () =>
    <header className="shop-account-header">
        <HeaderLeftBlock />
        <HeaderCenterBlock />
        <HeaderRightBlock />
    </header>;

const HeaderLeftBlock = () =>
    <div className="left-block header-block">
         <span className="button-back-to-insales">Вернуться в бэкофис</span>
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
        <span className="button-error-report">Сообщить об ошибке</span>
    </div>;