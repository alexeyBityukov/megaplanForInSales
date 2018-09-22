import React, {Component} from 'react';
import queryString from 'query-string';
import {Meteor} from "meteor/meteor";
import {withTracker} from "meteor/react-meteor-data";
import {Shops} from "../../../api/publications";

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
        Meteor.call('getApplicationChargeStatus', ShopInSalesId, (error, result) => {
            if(error)
                Meteor.call('upsertApplicationChargeStatus', ShopInSalesId);
             else
                debugger;
        });
    }

    render() {
        return <span></span>;
    }
}

export default withTracker(() => {
    Meteor.subscribe('shops', ShopInSalesId);
    return {
        shop: Shops.findOne({inSalesId: ShopInSalesId})
    };
})(ApplicationChargeStatusContainer);