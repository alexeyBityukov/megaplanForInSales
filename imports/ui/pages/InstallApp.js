import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import {withTracker} from "meteor/react-meteor-data";
import queryString from 'query-string';
import { errorCodeEmptyQuery, errorCodeEmptyAppSecretKey } from '../../api/installApp.js';
import { Shops } from '../../api/publications.js';

const queryParam = queryString.parse(location.search);

class InstallApp extends Component {
    constructor(props) {
        super(props);
        this.state = {error: ''};
    }

    upsertShop = () => {
        if(!this.isInstalled())
            Meteor.call('install', queryParam.shop, queryParam.token, queryParam.insales_id, (error) => {
                if(error && error.error === errorCodeEmptyQuery)
                    this.setState({error: errorCodeEmptyQuery});
                else if (error && error.error === errorCodeEmptyAppSecretKey)
                    this.setState({error: errorCodeEmptyAppSecretKey});
            });
    };

    isInstalled() {
        return !(this.props.shop === undefined);
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
        shop: Shops.findOne()
    };
})(InstallApp);