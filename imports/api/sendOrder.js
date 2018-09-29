import {Meteor} from "meteor/meteor";
import {Shops} from "./publications";

const Megaplan = require ('megaplanjs');

//I am sorry for callback hell, but this lib not work with promise

export const sendOrder = order => {
    //создать сделку
    try {
        const shop = Shops.findOne({inSalesId: order.account_id.toString()});
        const client = new Megaplan.Client(shop.megaplanApiBaseUrl).auth(shop.megaplanApiLogin, shop.megaplanApiPassword);
        Meteor.bindEnvironment(client.on('auth',  Meteor.bindEnvironment((res, err) => {
            try {
                if(err !== undefined)
                    throw new Error(err.message);
                else {
                    getPrograms(client, order);
                }
            }
            catch (e) {
                toLog(e);
            }
        })));
    }
    catch (e) {
        toLog(e);
    }
    return true;
};

const toLog = e => {
    console.log(e.message);
    //все ошибки в лог!
};

const getPrograms = (client, order) => {
    const programs = client.programs({}).send(function (tasks) {
        debugger;
        console.log(tasks); // still a lot of results
        /*const deal = {

        };
        client.deal_save(deal).send();*/
    }, function (err) {
        debugger;
        console.log(err);
    });
};
