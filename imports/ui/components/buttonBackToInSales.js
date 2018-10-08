import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { Shops } from "../../api/publications";
import queryString from "query-string";

const ShopInSalesId = queryString.parse(location.search).insales_id;

class ButtonBackToInSales extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: 'https://www.insales.ru'
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props && this.props.shop !== undefined)
            this.setState({url: 'https://' + this.props.shop.shopURL + '/admin'});
    }

    onClick(e) {
        e.preventDefault();
        window.location.replace(e.target.getAttribute('url'));
    }

    render() {
        return <span className="button-back-to-insales" onClick={this.onClick} url={this.state.url} style={{visibility: this.props.hideButtonBackToOffice? 'hidden': 'visible'}}>Вернуться в бэкофис</span>;
    }
}

export default withTracker(() => {
    Meteor.subscribe('shops', ShopInSalesId);
    return {
        shop: Shops.findOne({inSalesId: ShopInSalesId})
    };
})(ButtonBackToInSales);