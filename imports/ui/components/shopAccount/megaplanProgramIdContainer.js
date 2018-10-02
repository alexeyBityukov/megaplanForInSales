import React, {Component} from 'react';
import queryString from 'query-string';
import {Meteor} from "meteor/meteor";
import {withTracker} from "meteor/react-meteor-data";
import {Shops} from "../../../api/publications";
import MegaplanProgramId from './megaplanProgramId';

const ShopInSalesId = queryString.parse(location.search).insales_id;

class MegaplanProgramIdContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: true,
            listPrograms: [],
            error: ''
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps !== this.props && this.props.shop !== undefined) {
            this.setState({disabled: true});
            if ('MegaplanApiDataStatus' in this.props.shop && this.props.shop.MegaplanApiDataStatus === true) {
                this.setState({listPrograms: this.transformListPrograms()});
                this.setState({disabled: false});
            }
            Meteor.call('getListPrograms', ShopInSalesId);
        }
    }

    transformListPrograms() {
        let programs = [<option disabled selected value> -- Выберите схему -- </option>];
        programs.push(Object.keys(this.props.shop.listMegaplanProgram).map(program => {
             program = this.props.shop.listMegaplanProgram[program];
                if(program.active)
                    return <option key={program.id} program-id={program.id}>{program.name}</option>;
         }));
        return programs;
    }

    onSubmit = e => {
        e.preventDefault();
        this.setState({error: undefined});
        let selectedIndex = e.target[0].selectedIndex;
        let programId = e.target[0].options[selectedIndex].getAttribute('program-id');
        if(programId) {
            Meteor.call('upsertMegaplanProgramId', ShopInSalesId, programId);
        }
        else
            this.setState({error: 'Поле не должно быть пустым!'});
    };

    render() {
        return <MegaplanProgramId listPrograms={this.state.listPrograms} disabled={this.state.disabled} onSubmit={this.onSubmit} error={this.state.error}/>;
    }
}

export default withTracker(() => {
    Meteor.subscribe('shops', ShopInSalesId);
    return {
        shop: Shops.findOne({inSalesId: ShopInSalesId})
    };
})(MegaplanProgramIdContainer);