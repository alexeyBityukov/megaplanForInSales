import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import {withTracker} from "meteor/react-meteor-data";
import queryString from 'query-string';
import { Shops } from '../../api/installApp.js';

const queryParam = queryString.parse(location.search);

class InstallApp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        Meteor.call('install', queryParam.shop, queryParam.token, queryParam.insales_id, (error, result) => {
           // if(error && error.error === 500)
           //     this.setState({installStatus: false})
        });
    }

    render() {
        return (
            <div>
                {this.props.shops.length === 0 && <span>empty</span>}
                {this.props.shops.length !== 0 && <span>not empty</span>}
            </div>
        )
    }
}

export default withTracker(() => {
    Meteor.subscribe('shops', queryParam.insales_id);

    return {
        shops: Shops.find().fetch()
    };
})(InstallApp);