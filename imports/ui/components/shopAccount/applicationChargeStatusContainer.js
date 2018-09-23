import React, {Component} from 'react';
import queryString from 'query-string';
import {Meteor} from "meteor/meteor";
import {withTracker} from "meteor/react-meteor-data";
import {Shops} from "../../../api/publications";
import ApplicationChargeStatus from './applicationChargeStatus.js';

const ShopInSalesId = queryString.parse(location.search).insales_id;

class ApplicationChargeStatusContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevProps) {
        if(prevProps !== this.props && this.props.shop !== undefined)
            this.getApplicationChargeStatus();
    }

    getApplicationChargeStatus() {
        Meteor.call('getApplicationChargeStatus', ShopInSalesId, (error) => {
            if(error)
                Meteor.call('upsertApplicationChargeStatus', ShopInSalesId);
        });
    }

    render() {
        return <ApplicationChargeStatus status={this.props.shop && this.props.shop.lockDate} />;
    }
}

export default withTracker(() => {
    Meteor.subscribe('shops', ShopInSalesId);
    return {
        shop: Shops.findOne({inSalesId: ShopInSalesId})
    };
})(ApplicationChargeStatusContainer);