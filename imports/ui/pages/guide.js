import React from 'react';
import { Header } from "../components/header";
import { Footer } from "../components/footer";


export const Guide = () =>
    <div className="page-not-found">
        <Header hideButtonBackToOffice={true}/>
        <div className="guide">
            <h2>Интеграция InSales c системой</h2>
            <p>Для интеграции необходимо установить приложение и корректно заполнить поля авторизации. После заполнения приложение проверит введенные вами данные и сообщит вам о корректности ващих настроек.</p>
            <img src="/images/set-login-data.png" />
            <p>После чего вы можете выбрать нужную вам схему:</p>
            <img src="/images/set-program.png" />
        </div>
        <Footer />
    </div>;
