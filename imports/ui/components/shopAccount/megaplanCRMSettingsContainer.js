import React, { Component } from 'react';
import queryString from 'query-string';
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { Shops } from "../../../api/publications";
import { MegaplanCRMSettings } from './megaplanCRMSettings';

const ShopInSalesId = queryString.parse(location.search).insales_id;

class MegaplanCRMSettingsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: true,
            listPrograms: [],
            listResponsibleManagers: [],
            error: undefined,
            MegaplanApiProgramId: -1,
            ResponsibleManagerId: -1,
            status: undefined
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps !== this.props && 'shop' in this.props && this.props.shop !== undefined) {
            this.setState({disabled: true});
            Meteor.call('getListPrograms', ShopInSalesId);
            Meteor.call('getListResponsibleManagers', ShopInSalesId);
            if ('MegaplanApiDataStatus' in this.props.shop && this.props.shop.MegaplanApiDataStatus === true) {
                this.setState({
                    listPrograms: this.transformListPrograms(),
                    listResponsibleManagers: this.transformResponsibleManager(),
                    disabled: false,
                    MegaplanApiProgramId: this.props.shop.MegaplanApiProgramId === undefined? -1 : this.props.shop.MegaplanApiProgramId,
                    ResponsibleManagerId: this.props.shop.ResponsibleManagerId === undefined? -1 : this.props.shop.ResponsibleManagerId
                });
            }
        }
    }

    transformListPrograms() {
        let programs = [<option key="-1" value="-1" disabled> -- Выберите схему -- </option>];
        if('listMegaplanProgram' in this.props.shop && this.props.shop.listMegaplanProgram !== undefined)
            programs.push(Object.keys(this.props.shop.listMegaplanProgram).map(program => {
                 program = this.props.shop.listMegaplanProgram[program];
                    if(program.active)
                        return <option key={program.id} value={program.id}>{program.name}</option>;
             }));
        return programs;
    }

    transformResponsibleManager() {
        let responsibleManagers = [<option key="-1" value="-1" disabled> -- Выберите менеджера -- </option>];
        if('listResponsibleManagers' in this.props.shop && this.props.shop.listResponsibleManagers !== undefined)
            responsibleManagers.push(Object.keys(this.props.shop.listResponsibleManagers).map(responsibleManager => {
                responsibleManager = this.props.shop.listResponsibleManagers[responsibleManager];
                if(responsibleManager !== null)
                    return <option key={responsibleManager.id} value={responsibleManager.id}>{responsibleManager.name}</option>;
            }));
        return responsibleManagers;
    }

    onSubmit = e => {
        e.preventDefault();
        this.setState({error: undefined});
        let selectedIndexProgramId = e.target[0].selectedIndex;
        let programId = e.target[0][selectedIndexProgramId].value;
        let selectedIndexResponsibleManagerId = e.target[1].selectedIndex;
        let ResponsibleManagerId = e.target[1][selectedIndexResponsibleManagerId].value;
        if(programId && programId !== "-1" && ResponsibleManagerId && ResponsibleManagerId !== "-1") {
            Meteor.call('upsertMegaplanProgramId', ShopInSalesId, programId, ResponsibleManagerId);
            this.setState({status: 'Сохранено'});
        }
        else
            this.setState({error: 'Поля не должны быть пустыми!'});
    };

    onChangeProgramId = e => {
        e.preventDefault();
        this.setState({
            MegaplanApiProgramId: e.target.value,
            status: undefined
        });
    };

    onChangeResponsibleManager = e => {
        e.preventDefault();
        this.setState({
            ResponsibleManagerId: e.target.value,
            status: undefined
        });
    };

    render() {
        return <MegaplanCRMSettings
            listPrograms={this.state.listPrograms}
            listResponsibleManagers = {this.state.listResponsibleManagers}
            disabled={this.state.disabled}
            onSubmit={this.onSubmit}
            error={this.state.error}
            selectedProgram={this.state.MegaplanApiProgramId}
            selectedResponsibleManager={this.state.ResponsibleManagerId}
            onChangeProgramId={this.onChangeProgramId}
            onChangeResponsibleManager={this.onChangeResponsibleManager}
            status={this.state.status}
        />;
    }
}

export default withTracker(() => {
    Meteor.subscribe('shops', ShopInSalesId);
    return {
        shop: Shops.findOne({inSalesId: ShopInSalesId})
    };
})(MegaplanCRMSettingsContainer);