import React, { Component } from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import {Shops} from '../../../api/publications';
import queryString from 'query-string';
import { errorCodeInvalidMegaplanAuthData} from '../../../api/megaplanApi';
import MegaplanAuthorization from './megaplanAuthorization';

const ShopInSalesId = queryString.parse(location.search).insales_id;

class MegaplanAuthorizationContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: undefined,
            status: undefined,
        };
    }

    componentDidUpdate(prevProps) {
        if(prevProps !== this.props && this.props.shop !== undefined) {
            Meteor.call('isValidMegaplanApiData', ShopInSalesId, (error, result) => {
                if (error && error.error === errorCodeInvalidMegaplanAuthData)
                    this.setState({error: 'Некорректные данные!'});
                else if(result)
                    this.setState({status: 'Ок!'});
                else
                    this.setState({error: 'Неизвесная ошибка!'});

            });
        }
    }

    onSubmit = e => {
        e.preventDefault();
        this.setState({status: undefined});
        if (e.target[0].value && e.target[1].value && e.target[2].value) {
            const login = e.target[0].value;
            const password = e.target[1].value;
            const baseUrl = e.target[2].value;
            this.setState({error: undefined});
            Meteor.call('upsertMegaplanApiData', ShopInSalesId, login, password, baseUrl, (error, result) => {
                if(error && error.error === errorCodeInvalidMegaplanAuthData)
                    this.setState({error: 'Некорректные данные!'});
                else if(result)
                    this.setState({status: 'Данные обновлены!'});
                else
                    this.setState({error: 'Неизвесная ошибка!'});
            });
        }
        else
            this.setState({error: 'Заполните все поля!'});
    };

    render() {
        return (
            <MegaplanAuthorization
                onSubmit={this.onSubmit}
                megaplanApiLogin={this.props.shop && this.props.shop.megaplanApiLogin}
                megaplanApiPassword={this.props.shop && this.props.shop.megaplanApiPassword}
                megaplanApiBaseUrl={this.props.shop && this.props.shop.megaplanApiBaseUrl}
                error={this.state.error}
                status={this.state.status}
            />
        );
    }
}

export default withTracker(() => {
    Meteor.subscribe('shops', ShopInSalesId);
    return {
        shop: Shops.findOne({inSalesId: ShopInSalesId})
    };
})(MegaplanAuthorizationContainer);