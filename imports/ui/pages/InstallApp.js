import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import {withTracker} from "meteor/react-meteor-data";
import queryString from 'query-string';
import { Shops, errorCodeEmptyQuery, errorCodeEmptyAppSecretKey } from '../../api/installApp.js';

const queryParam = queryString.parse(location.search);

class InstallApp extends Component {
    constructor(props) {
        super(props);
        this.state = {error: ''};
    }

    upsertShop = () => {
        if(!this.isInstalled())
            Meteor.call('install', queryParam.shop, queryParam.token, queryParam.insales_id, (error, result) => {
                if(error && error.error === errorCodeEmptyQuery)
                    this.setState({error: errorCodeEmptyQuery});
                else if (error && error.error === errorCodeEmptyAppSecretKey)
                    this.setState({error: errorCodeEmptyAppSecretKey});
            });
    };

    isInstalled() {
        return !(this.props.shops.length === 0);
    }

    componentWillMount() {
        this.upsertShop();
    }

    componentDidUpdate() {
        this.upsertShop();
    }

    render() {
        let message = '';

        if(this.state.error !== '')
            message = <span>error</span>;//использовать компонент ошибка
        else if(!this.isInstalled())
            message = <span>Application installing...</span>;
        else if(this.isInstalled())
            message = <span>Application successfully installed</span>;

        return (
            <div>
                {message}
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