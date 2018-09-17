import React, { Component } from 'react';
import {withTracker} from "meteor/react-meteor-data";
import { errorCodeEmptyQuery, errorCodeEmptyAppSecretKey } from '../../api/installApp.js';
import { Shops } from '../../api/publications.js';


class InstallApp extends Component {
    constructor(props) {
        super(props);
    }

    isInstalled() {
        return !(this.props.shop === undefined);
    }

    render() {
        let message = '';

        if(this.props.errorCode !== undefined)
            message = <span>error</span>;//использовать компонент ошибка
        else if(!this.isInstalled())
            message = <span>Application not installed</span>;
        else if(this.isInstalled())
            message = <span>Application successfully installed</span>;

        return (
            <div>
                {message}
            </div>
        )
    }
}

export default withTracker((query) => {
    return {
        shop: Shops.findOne({inSalesId: query.inSalesId})
    };
})(InstallApp);