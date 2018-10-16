import React from 'react';
import ButtonBackToInSales from './buttonBackToInSales';

export const Header = (props) =>
    <header className="shop-account-header">
        <HeaderLeftBlock hideButtonBackToOffice={props.hideButtonBackToOffice}/>
        <HeaderCenterBlock />
        <HeaderRightBlock />
    </header>;

const HeaderLeftBlock = (props) =>
        <ButtonBackToInSales hideButtonBackToOffice={props.hideButtonBackToOffice}/>
    ;

        const HeaderCenterBlock = () =>
    <div className="logo header-block">
        <a href="https://megaplan.ru/" title="Мегаплан">
            <img className="logo-img" src="https://megaplan.ru/local/templates/main_template/img/logo-black.svg" alt="Мегаплан" />
        </a>
    </div>;

const HeaderRightBlock = () =>
    <div className="right-block">
        <a className="support-email" href="tel:+79207217747">
            <span className="support-email">+7 (920) 721-77-47</span>
        </a>
        <a className="support-email" href="mailto:support@helixmedia.ru">
            <span className="button-error-report">Сообщить о ошибке</span>
        </a>
    </div>;