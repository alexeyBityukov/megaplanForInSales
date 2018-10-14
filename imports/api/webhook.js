import { Meteor } from 'meteor/meteor';
import { Shops } from './publications';
import { inSalesApiGet, inSalesApiPost } from './inSalesHttpRequests';
import { config } from '../config';

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