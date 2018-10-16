import React from 'react';
import { Header } from "../components/header";
import { Footer } from "../components/footer";


export const NotFoundPage = () =>
    <div className="page-not-found">
        <Header hideButtonBackToOffice={true}/>
        <div className="page-not-found-message">
            <h2>404 - Страница не найдена</h2>
        </div>
        <Footer />
    </div>;
