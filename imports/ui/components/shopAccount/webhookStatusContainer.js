import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from "meteor/react-meteor-data";
import queryString from 'query-string';
import { Shops } from '../../../api/publications';
import { WebhookStatus } from './webhookStatus';

const ShopInSalesId = queryString.parse(location.search).insales_id;

class WebhookStatusContainer extends Component {
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
            Meteor.call('installWebhook', ShopInSalesId, (error, result) => {
                if(result)
                    this.setState({webhookInstallStatus: 'установлен'});
                else
                    this.setState({webhookInstallStatus: error.message});
            });
    }

    webhookIdIsValid() {
        Meteor.call('webhookIdIsValid', ShopInSalesId, (error, result) => {
            if(result)
                this.setState({ webhookInstallStatus: 'установлен'});
            else if(error) {
                this.setState({webhookInstallStatus: error.message});
                Meteor.call('installWebhook', ShopInSalesId, (error, result) => {
                    if(result)
                        this.setState({webhookInstallStatus: 'установлен'});
                    else
                        this.setState({webhookInstallStatus: error.message});
                });
            }
        });
    }

    render() {
        return <WebhookStatus webhookInstallStatus={this.state.webhookInstallStatus}/>;
    }
}

export default withTracker(() => {
    Meteor.subscribe('shops', ShopInSalesId);
    return {
        shop: Shops.findOne({inSalesId: ShopInSalesId})
    };
})(WebhookStatusContainer);