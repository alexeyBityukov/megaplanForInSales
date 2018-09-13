import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import {withTracker} from "meteor/react-meteor-data";
import queryString from 'query-string';
import { Shops } from '../../api/publications.js';

const queryParam = queryString.parse(location.search);

class ShopAccount extends Component {
    constructor(props) {
        super(props);
        //this.state = {error: ''};
    }

    render() {
        return (
            <div>
                account
            </div>
        )
    }
}

export default withTracker(() => {
    Meteor.subscribe('shops', queryParam.insales_id);

    return {
        shop: Shops.findOne()
    };
})(ShopAccount);