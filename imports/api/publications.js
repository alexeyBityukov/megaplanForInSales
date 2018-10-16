import {Meteor} from "meteor/meteor";
import { Mongo } from 'meteor/mongo';

export const Shops = new Mongo.Collection('shops');

export let publishShops = () => {
    if (Meteor.isServer)
        Meteor.publish('shops', function(inSalesId) {
            return Shops.find({
                inSalesId: inSalesId
            },
            {
                fields: {
                    megaplanApiPassword: false,
                    megaplanApiLogin: false
                }
            });
        });
};

publishShops();