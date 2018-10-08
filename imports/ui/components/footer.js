import React from 'react';

export const Footer = () =>
    <footer className="shop-account-footer">
        <FooterLeftBlock />
        <FooterRightBlock />
    </footer>;

const FooterLeftBlock = () =>
    <div className="left-block-footer">
        <span className="footer-developer-name">2018 - Битюков Алексей</span>
    </div>;

const FooterRightBlock = () =>
    <div className="right-block-footer">
        <a className="footer-email" href="mailto:alex.bityuckov@gmail.com">
            <span className="footer-email">alex.bityuckov@gmail.com</span>
        </a>
    </div>;
