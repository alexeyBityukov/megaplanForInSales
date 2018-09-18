import React, { Component } from 'react';
import {withTracker} from "meteor/react-meteor-data";
import { Shops } from '../../api/publications.js';
import InstallError from '../components/installError';


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
            message = <InstallError errorCode={this.props.errorCode} errorMessage={this.props.errorMessage}/>;
        else if (!this.isInstalled())
            message = <span className="install-status">Application not installed</span>;
        else if (this.isInstalled())
            message = <span className="install-status">Application successfully installed</span>;

        return (
            <div className="installInfo">
                {message}
            </div>
        );
    }
}

export default withTracker((query) => {
    return {
        shop: Shops.findOne({inSalesId: query.inSalesId})
    };
})(InstallApp);