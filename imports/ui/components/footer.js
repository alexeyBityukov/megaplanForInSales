import React from 'react';

export const Footer = () =>
    <footer className="shop-account-footer">
        <FooterLeftBlock />
        <FooterRightBlock />
    </footer>;

const FooterLeftBlock = () =>
    <div className="left-block-footer">
        <span className="footer-developer-name">2018 - HELIX MEDIA, LLC</span>
    </div>;

const FooterRightBlock = () =>
    <div className="right-block-footer">
        <a className="footer-email" href="mailto:support@helixmedia.ru">
            <span className="footer-email">support@helixmedia.ru</span>
        </a>
    </div>;
