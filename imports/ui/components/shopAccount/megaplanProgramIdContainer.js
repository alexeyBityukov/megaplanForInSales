import React, { Component } from 'react';
import queryString from 'query-string';
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { Shops } from "../../../api/publications";
import { MegaplanProgramId } from './megaplanProgramId';

const ShopInSalesId = queryString.parse(location.search).insales_id;

class MegaplanProgramIdContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: true,
            listPrograms: [],
            error: '',
            MegaplanApiProgramId: -1,
            status: ''
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps !== this.props && this.props.shop !== undefined) {
            this.setState({disabled: true});
            if ('MegaplanApiDataStatus' in this.props.shop && this.props.shop.MegaplanApiDataStatus === true) {
                this.setState({
                    listPrograms: this.transformListPrograms(),
                    disabled: false,
                    MegaplanApiProgramId: this.props.shop.MegaplanApiProgramId === undefined? -1 : this.props.shop.MegaplanApiProgramId
                });
            }
            Meteor.call('getListPrograms', ShopInSalesId);
        }
    }

    transformListPrograms() {
        let programs = [<option key="-1" value="-1" disabled> -- Выберите схему -- </option>];
        programs.push(Object.keys(this.props.shop.listMegaplanProgram).map(program => {
             program = this.props.shop.listMegaplanProgram[program];
                if(program.active)
                    return <option key={program.id} value={program.id}>{program.name}</option>;
         }));
        return programs;
    }

    onSubmit = e => {
        e.preventDefault();
        this.setState({error: undefined});
        let selectedIndex = e.target[0].selectedIndex;
        let programId = e.target[0][selectedIndex].value;
        if(programId && programId !== "-1") {
            Meteor.call('upsertMegaplanProgramId', ShopInSalesId, programId);
            this.setState({status: 'Сохранено!'});
        }
        else
            this.setState({error: 'Поле не должно быть пустым!'});
    };

    onChange = e => {
        e.preventDefault();
        this.setState({
            MegaplanApiProgramId: e.target.value,
            status: undefined
        });
    };

    render() {
        return <MegaplanProgramId
            listPrograms={this.state.listPrograms}
            disabled={this.state.disabled}
            onSubmit={this.onSubmit}
            error={this.state.error}
            value={this.state.MegaplanApiProgramId}
            onChange={this.onChange}
            status={this.state.status}
        />;
    }
}

export default withTracker(() => {
    Meteor.subscribe('shops', ShopInSalesId);
    return {
        shop: Shops.findOne({inSalesId: ShopInSalesId})
    };
})(MegaplanProgramIdContainer);