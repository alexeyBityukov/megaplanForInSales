import React, { Component } from 'react';

export default class InstallError extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if(this.props.errorCode !== undefined)
            return (<div className="error-message">
                {this.props.errorMessage}
            </div>);
        return '';
    }
}
