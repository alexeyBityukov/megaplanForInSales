import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import {withTracker} from "meteor/react-meteor-data";
import queryString from 'query-string';
import { Shops } from '../../api/publications.js';
import ShopAccount from '../pages/shopAccount.js';

const ShopInSalesId = queryString.parse(location.search).insales_id;

class ShopAccountContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            webhookInstallStatus: '',
        };
    }

    componentDidUpdate(prevProps) {
        if(prevProps !== this.props && this.props.shop !== undefined)
            this.webhookIsInstalled();
    }

    webhookIsInstalled() {
        if('webhookId' in this.props.shop){
            this.webhookIdIsValid();
        }
        else
            Meteor.call('installWebhook', ShopInSalesId, this.installingWebhookCallback);
    }

    webhookIdIsValid() {
        Meteor.call('webhookIdIsValid', ShopInSalesId, this.props.shop.webhookId, this.props.shop.passwordForApi, this.props.shop.shopURL, (error, result) => {
            if(result)
                this.setState({webhookIdIsValid: true, webhookInstallStatus: 'Вебхук установлен'});
            else if(error) {
                this.setState({webhookIdIsValid: false, webhookInstallStatus: error.message});
                Meteor.call('installWebhook', ShopInSalesId, this.installingWebhookCallback);
            }
        });
    }

    installingWebhookCallback(error, result) {
        if(result)
            this.setState({webhookIdIsValid: true, webhookInstallStatus: 'Вебхук установлен'});
        else
            this.setState({webhookIdIsValid: false, webhookInstallStatus: error.message});
    }

    render() {
        return <ShopAccount webhookInstallStatus={this.state.webhookInstallStatus}/>;
    }
}

export default withTracker(() => {
    Meteor.subscribe('shops', ShopInSalesId);
    return {
        shop: Shops.findOne({inSalesId: ShopInSalesId})
    };
})(ShopAccountContainer);