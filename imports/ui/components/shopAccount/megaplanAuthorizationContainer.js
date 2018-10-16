import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Shops } from '../../../api/publications';
import queryString from 'query-string';
import { errorCodeInvalidMegaplanAuthData } from '../../../api/megaplanApi';
import { MegaplanAuthorization } from './megaplanAuthorization';

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
        if(prevProps !== this.props && 'shop' in this.props && this.props.shop !== undefined) {
            Meteor.call('isValidMegaplanApiData', ShopInSalesId);
            if(this.state.error === undefined && this.props.shop.MegaplanApiDataStatus === true)
                this.setState({status: 'Настройки корректны', error: undefined});
            else if(this.state.error === undefined && this.props.shop.MegaplanApiDataStatus === undefined)
                this.setState({status: 'Заполните поля!', error: undefined});
            else
                this.setState({error: 'Некорректные данные!', status: undefined});
        }
    }

    onSubmit = e => {
        e.preventDefault();
        if (e.target[0].value && e.target[1].value && e.target[2].value) {
            let baseUrl = e.target[2].value.replace(/https:/, '').replace(/\//g, '');
            if (baseUrl.match(/\.megaplan\.ru$/) === null)
                this.setState({error: 'Приведите ссылку к виду yourId.megaplan.ru', status: undefined});
            else {
                const login = e.target[0].value;
                const password = e.target[1].value;
                Meteor.call('upsertMegaplanApiData', ShopInSalesId, login, password, baseUrl, (error, result) => {
                    if (result)
                        this.setState({status: 'Настройки сохранены', error: undefined});
                    else
                        this.setState({error: 'Неизвесная ошибка!', status: undefined});
                });
            }
        }
        else
            this.setState({error: 'Заполните все поля!', status: undefined});
    };

    render() {
        return (
            <MegaplanAuthorization
                onSubmit={this.onSubmit}
                megaplanApiLogin={this.props.shop && this.props.shop.megaplanApiLoginMask}
                megaplanApiPassword={this.props.shop && this.props.shop.megaplanApiPasswordMask}
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