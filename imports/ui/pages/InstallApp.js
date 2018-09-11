import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import queryString from 'query-string';

export default class InstallApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            installStatus: null
        };
    }

    componentDidMount() {
        let queryParam = queryString.parse(location.search);
        Meteor.call('install', queryParam.shop, queryParam.token, queryParam.insales_id, (error, result) => {
           // if(error && error.error === 500)
           //     this.setState({installStatus: false})
            this.setState({installStatus: result});
        });
    }

    render() {
        return (
            <div>
                {this.state.installStatus === null && <span>installing</span>}
                {this.state.installStatus === true && <span>installed</span>}
                {this.state.installStatus === false && <span>install err</span>}
            </div>
        )
    }
}
