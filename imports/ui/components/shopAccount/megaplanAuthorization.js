import React, { Component } from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import {Shops} from '../../../api/publications';
import queryString from 'query-string';
import { errorCodeInvalidMegaplanAuthData} from '../../../api/megaplanApi';

const ShopInSalesId = queryString.parse(location.search).insales_id;

class MegaplanAuthorization extends Component {
    constructor(props) {
        super(props);
        this.state = {error: undefined};
        this.onClickUpdate = this.onClickUpdate.bind(this);
    }

    componentDidUpdate(prevProps) {
        if(prevProps !== this.props && this.props.shop !== undefined)
            Meteor.call('isValidMegaplanApiData', ShopInSalesId,  (error, result) => {
                if(error && error.error === errorCodeInvalidMegaplanAuthData)
                    this.setState({error: 'Некорректный логин или пароль!'});
                else
                    this.setState({error: 'Неизвесная ошибка!'});

            });
    }

    onClickUpdate(e) {
        e.preventDefault();
        if (e.target[0].value && e.target[1].value) {
            const login = e.target[0].value;
            const password = e.target[1].value;
            this.setState({error: undefined});
            Meteor.call('upsertMegaplanApiData', login, password, (error, result) => {
               if(error && error.error === errorCodeInvalidMegaplanAuthData)
                    this.setState({error: 'Некорректный логин или пароль!'});
                else
                    this.setState({error: 'Неизвесная ошибка!'});
            });
        }
        else
            this.setState({error: 'Заполните все поля!'});
    }

    render() {
        return (
            <form onSubmit={this.onClickUpdate}>
                <div>
                    <label htmlFor="login">Логин</label>
                    <input id="login" type="text" value={this.props.shop && this.props.shop.megaplanApiLogin} autoComplete="false"/>
                </div>
                <div>
                    <label htmlFor="password">Пароль</label>
                    <input id="password" type="password" value={this.props.shop && this.props.shop.megaplanApiPassword} autoComplete="false"/>
                </div>
                <div>
                    <span>{this.state.error && this.state.error}</span>
                </div>
                <div>
                    <button>Обновить</button>
                </div>
            </form>
        );
    }
}

export default withTracker(() => {
    Meteor.subscribe('shops', ShopInSalesId);
    return {
        shop: Shops.findOne({inSalesId: ShopInSalesId})
    };
})(MegaplanAuthorization);