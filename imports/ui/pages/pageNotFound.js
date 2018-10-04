import React from 'react';
import { ShopAccountHeader } from "../components/shopAccount/shopAccountHeader";
import { ShopAccountFooter } from "../components/shopAccount/shopAccountFooter";


export const NotFoundPage = () =>
    <div className="page-not-found">
        <ShopAccountHeader />
        <div className="page-not-found-message">
            <h2>404 - Страница не найдена</h2>
        </div>
        <ShopAccountFooter />
    </div>;
