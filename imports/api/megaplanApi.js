import { Meteor } from 'meteor/meteor';
import { Shops } from './publications';
import React from "react";

const Megaplan = require ('megaplanjs');

const setMegaplanApiDataStatus = (status, inSalesId) => {
    let data = {};
    if(status === false) {
        data = {
            MegaplanApiDataStatus: status,
            listMegaplanProgram: ''
        };
    }
    else {
        data = {
            MegaplanApiDataStatus: status
        };
    }
    Shops.upsert({
            inSalesId
        },
        {
            $set: data
        }
    );
};

Meteor.methods({
    upsertMegaplanApiData(inSalesId, login, password, baseUrl) {
        if(Meteor.isServer)
            try {
                const client = new Megaplan.Client(baseUrl).auth(login, password);
                Meteor.bindEnvironment(client.on('auth',  Meteor.bindEnvironment((res, err) => {
                    try {
                        if(err !== undefined)
                            setMegaplanApiDataStatus(false, inSalesId);
                        else {
                            setMegaplanApiDataStatus(true, inSalesId);
                            let megaplanApiLoginMask = '';
                            for(let i = 0; i < login.length/2 - 0.5; i++) megaplanApiLoginMask+='*';
                            megaplanApiLoginMask+=login.substring(parseInt(login.length/2));
                            let megaplanApiPasswordMask = '';
                            for(let i = 0; i < password.length; i++) megaplanApiPasswordMask+='*';
                            Shops.upsert({
                                    inSalesId
                                },
                                {
                                    $set: {
                                        megaplanApiLogin: login,
                                        megaplanApiPassword: password,
                                        megaplanApiBaseUrl: baseUrl,
                                        megaplanApiLoginMask: megaplanApiLoginMask,
                                        megaplanApiPasswordMask: megaplanApiPasswordMask,
                                    }
                                }
                            );
                        }
                    }
                    catch (e) {
                        setMegaplanApiDataStatus(false, inSalesId);
                    }
                })));
            }
            catch (e) {
                setMegaplanApiDataStatus(false, inSalesId);
            }
        return true;
    },
    isValidMegaplanApiData(inSalesId) {
        if(Meteor.isServer)
            try {
                const shop = Shops.findOne({inSalesId : inSalesId});
                if(shop.megaplanApiBaseUrl === undefined || shop.megaplanApiLogin === undefined || shop.megaplanApiPassword === undefined) {
                    Shops.upsert({
                            inSalesId
                        },
                        {
                            $unset: {
                                MegaplanApiDataStatus: '',
                            }
                        }
                    );
                    return true;
                }
                const client = new Megaplan.Client(shop.megaplanApiBaseUrl).auth(shop.megaplanApiLogin, shop.megaplanApiPassword);
                Meteor.bindEnvironment(client.on('auth',  Meteor.bindEnvironment((res, err) => {
                    try {
                        if(err !== undefined)
                            setMegaplanApiDataStatus(false, inSalesId);
                        else
                            setMegaplanApiDataStatus(true, inSalesId);
                    }
                    catch (e) {
                        setMegaplanApiDataStatus(false, inSalesId);
                    }
                })));
            }
            catch (e) {
                setMegaplanApiDataStatus(false, inSalesId);
            }
        return true;
    },
    getListPrograms(inSalesId) {
        if(Meteor.isServer)
            try {
                const shop = Shops.findOne({inSalesId : inSalesId});
                const client = new Megaplan.Client(shop.megaplanApiBaseUrl).auth(shop.megaplanApiLogin, shop.megaplanApiPassword);
                Meteor.bindEnvironment(client.on('auth',  Meteor.bindEnvironment((resp, err) => {
                    try {
                        client.programs({}).send(Meteor.bindEnvironment(resp => {
                            resp.programs = (Object.keys(resp.programs).map(i => {
                                resp.programs[i].statuses = undefined;
                                resp.programs[i].initial_status = undefined;
                                resp.programs[i].numeration_mask = undefined;
                                resp.programs[i].description = undefined;
                                return resp.programs[i];
                            }));
                            Shops.upsert({
                                    inSalesId
                                },
                                {
                                    $set: {
                                        listMegaplanProgram: resp.programs
                                    }
                                }
                            );
                        }), Meteor.bindEnvironment(err => {
                        }));
                    }
                    catch (e) {
                    }
                })));
            }
            catch (e) {
            }
    },
    getListResponsibleManagers(inSalesId) {
        if(Meteor.isServer)
            try {
                const shop = Shops.findOne({inSalesId : inSalesId});
                const client = new Megaplan.Client(shop.megaplanApiBaseUrl).auth(shop.megaplanApiLogin, shop.megaplanApiPassword);
                Meteor.bindEnvironment(client.on('auth',  Meteor.bindEnvironment((resp, err) => {
                    try {
                        client.employees({}).send(Meteor.bindEnvironment(resp => {
                            resp.employees = (Object.keys(resp.employees).map(i => {
                                let employer = {
                                    id: resp.employees[i].id,
                                    name: resp.employees[i].name
                                };
                                if(resp.employees[i].fire_day === null)
                                    return employer;
                            }));
                            Shops.upsert({
                                    inSalesId
                                },
                                {
                                    $set: {
                                        listResponsibleManagers: resp.employees
                                    }
                                }
                            );
                        }), Meteor.bindEnvironment(err => {
                        }));
                    }
                    catch (e) {
                    }
                })));
            }
            catch (e) {
            }
    }
});