import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import {withTracker} from "meteor/react-meteor-data";
import queryString from 'query-string';
import { Shops } from '../../api/publications.js';

const queryParam = queryString.parse(location.search);
export const webhookInstallStatuses = {
    findingWebhookId: 'Поиск webhookID',
    findWebhookId: 'webhookID найден',
    notFindWebhookId: 'webhookID НЕ найден',
    ok: 'webhookID найден, нужно проверить его доступность',
};

class ShopAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {webhookInstallStatus: webhookInstallStatuses.findingWebhookId};
    }

    webhookIsInstalled() {
        if(this.props.shop !== undefined && 'webhookId' in this.props.shop)
            this.webhookStatusInstallUpadte(webhookInstallStatuses.ok); //check avalable webhook
        else
            this.webhookStatusInstallUpadte(webhookInstallStatuses.notFindWebhookId);
    }

    webhookStatusInstallUpadte(newStatus) {
        if(this.props.shop !== undefined && this.state.webhookInstallStatus !== newStatus)
            this.setState({webhookInstallStatus: newStatus});
    }

    componentDidMount() {
        this.webhookIsInstalled();
        /*Meteor.call('webhookIsInstalled', queryParam.insales_id, (error, result) => {
            this.setState({webhookInstallStatus: result});
        });*/
    }

    componentDidUpdate() {
        this.webhookIsInstalled();
    }

    render() {
        return (
            <div>
                <p className="webhookInstallStatus">{this.state.webhookInstallStatus}</p>
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