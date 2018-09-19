import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import {withTracker} from "meteor/react-meteor-data";
import queryString from 'query-string';
import { Shops } from '../../api/publications.js';
import { webhookInstallStatuses } from "../../api/webhook.js";

const queryParam = queryString.parse(location.search);

class ShopAccount extends Component {
    constructor(props) {
        super(props);
    }

    webhookIsInstalled() {
        if(this.props.shop !== undefined)
            if('webhookId' in this.props.shop){
                if('webhookInstallStatus' in this.props.shop && this.props.shop.webhookInstallStatus !== webhookInstallStatuses.webhookIdInvalid && this.props.shop.webhookInstallStatus !== webhookInstallStatuses.webhookInstallingError)
                    this.webhookIdIsValid();
                else
                    if('webhookInstallStatus' in this.props.shop && this.props.shop.webhookInstallStatus !== webhookInstallStatuses.webhookInstallingError)
                        Meteor.call('installWebhook', queryParam.insales_id, this.props.shop.passwordForApi, this.props.shop.shopURL);
            }
            else
                Meteor.call('installWebhook', queryParam.insales_id, this.props.shop.passwordForApi, this.props.shop.shopURL);
    }

    webhookIdIsValid() {
        Meteor.call('webhookIdIsValid', queryParam.insales_id, this.props.shop.webhookId, this.props.shop.passwordForApi, this.props.shop.shopURL);

    }

    getWebhookInstallStatus() {
        if(this.props.shop !== undefined && 'webhookInstallStatus' in this.props.shop)
            return this.props.shop.webhookInstallStatus;
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
                <p className="webhookInstallStatus">Статус вебхука: {this.getWebhookInstallStatus()} <button>Ручное обновление</button></p>
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