import { Meteor } from 'meteor/meteor';
import { config } from '../config.js';
import { Shops } from './publications.js';
import { publishShops } from '../api/publications.js';

publishShops();

export const webhookNotFoundErrorCode = 'webhook-not-found';

Meteor.methods({
    webhookIdIsValid(inSalesId, webhookId, passwordForApi, shopURL) {
        let setWebhookIdLastUpdate = () => {
            Shops.update({
                inSalesId: inSalesId
            },
            {
                $set: {webhookIdLastUpdate: new Date()}
            });
        };

        try {
            const url = `${config.requestProtocol}://${config.applicationId}:${passwordForApi}@${shopURL}/admin/webhooks/${webhookId}.json`;
            const result = HTTP.call('GET', url, {
                auth: config.applicationId + ':' + passwordForApi,
                headers: {'Content-Type': 'application/json'}
            });
            setWebhookIdLastUpdate();
            if(response.statusCode === 200)
                return true;
            else if(response.statusCode === 404)
                return webhookNotFound;
            else
                return response.message;
        } catch (e) {
            return e.message;
        }
        finally {
            setWebhookIdLastUpdate();
        }
    }
});