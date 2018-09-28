import { Meteor } from 'meteor/meteor';
import { Shops } from './publications';

const Megaplan = require ('megaplanjs');

const setMegaplanApiDataStatus = (status, inSalesId) => {
    Shops.upsert({
            inSalesId
        },
        {
            $set: {
                setMegaplanApiDataStatus: status,
            }
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
                            Shops.upsert({
                                    inSalesId
                                },
                                {
                                    $set: {
                                        megaplanApiLogin: login,
                                        megaplanApiPassword: password,
                                        megaplanApiBaseUrl: baseUrl,
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
                                setMegaplanApiDataStatus: '',
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
    }
});