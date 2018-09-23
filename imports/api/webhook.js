import { Meteor } from 'meteor/meteor';
import { Shops } from './publications.js';
import { publishShops } from '../api/publications.js';
import { inSalesApiGet, inSalesApiPost } from './inSalesHttpRequests.js';
import { config } from '../config.js';

publishShops();

Meteor.methods({
    webhookIdIsValid(inSalesId) {
        const shop = Shops.findOne({inSalesId : inSalesId});
        return inSalesApiGet(inSalesId, `webhooks/${shop.webhookId}.json`);
    },

    installWebhook(inSalesId) {
        const data = {
            webhook: {
                address: config.webhookURL,
                topic: 'orders/create',
                format_type: 'json'
            }
        };
        const result = inSalesApiPost(inSalesId, 'webhooks.json', data);
        if(result && result.statusCode === 201) {
            Shops.update(
                {inSalesId: inSalesId},
                {$set: {webhookId: result.data.id}}
            );
            return true;
        }
        else return false;
    }
});