import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import {withTracker} from "meteor/react-meteor-data";
import queryString from 'query-string';
import { Shops } from '../../api/publications.js';
import { webhookNotFoundErrorCode } from "../../api/webhook.js";

const queryParam = queryString.parse(location.search);
export const webhookInstallStatuses = {
    findingWebhookId: 'Поиск идентификатора',
    notFindWebhookId: 'Идентификатор отсутствует',
    checkingWebhookId: 'Проверка идентификатора',
    installingWebhook: 'Установка',
    webhookIdInvalid: 'Недоступен',
    webhookIdValid: 'Установлен',
};
const wedhookStatusUpadteInterval = 10000;

class ShopAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {webhookInstallStatus: webhookInstallStatuses.findingWebhookId};
    }

    webhookIsInstalled() {
        if(this.props.shop !== undefined && 'webhookId' in this.props.shop ){
            this.webhookIdIsValid();
        }
        else
            this.webhookStatusInstallUpdate(webhookInstallStatuses.notFindWebhookId);
    }

    webhookIdIsValid() {
        if (!('webhookIdLastUpdate' in this.props.shop) || new Date() - new Date(this.props.shop.webhookIdLastUpdate) > wedhookStatusUpadteInterval)
            Meteor.call('webhookIdIsValid', queryParam.insales_id, this.props.shop.webhookId, this.props.shop.passwordForApi, this.props.shop.shopURL, (error, result) => {
                if(result === webhookNotFoundErrorCode) {
                    this.webhookStatusInstallUpdate(webhookInstallStatuses.installingWebhook);
                    //инициализировать установку
                }
                else if(result === true)
                    this.webhookStatusInstallUpdate(webhookInstallStatuses.webhookIdValid);
                else
                    this.webhookStatusInstallUpdate(webhookInstallStatuses.webhookIdInvalid);
            });
    }

    webhookStatusInstallUpdate(newStatus) {
        if(this.props.shop !== undefined && this.state.webhookInstallStatus !== newStatus)
            if(!((this.state.webhookInstallStatus === webhookInstallStatuses.webhookIdInvalid || this.state.webhookInstallStatus === webhookInstallStatuses.webhookIdValid) &&
                (newStatus === webhookInstallStatuses.checkingWebhookId || newStatus === webhookInstallStatuses.installingWebhook)))
                this.setState({webhookInstallStatus: newStatus});
    }

    componentDidMount() {
        this.webhookIsInstalled();
    }

    componentDidUpdate() {
        this.webhookIsInstalled();
    }

    render() {
        //провека insales id на существование
        return (
            <div>
                <p className="webhookInstallStatus">Статус вебхука: {this.state.webhookInstallStatus}</p>
                <p>account</p>
            </div>
        )
    }
}

export default withTracker(() => {
    Meteor.subscribe('shops', queryParam.insales_id);

    return {
        shop: Shops.findOne({inSalesId: queryParam.insales_id})
    };
})(ShopAccount);