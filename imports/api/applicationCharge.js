import { Meteor } from 'meteor/meteor';
import { Shops } from './publications.js';
import { inSalesApiGet, inSalesApiPost } from '../api/httpRequests.js';
import { config } from '../config.js';

Meteor.methods({
    getApplicationChargeStatus(inSalesId) {
        const responce =  inSalesApiGet(inSalesId, 'recurring_application_charge.json');
        if(responce && 'data' in responce && responce.data.monthly === null )
            throw new Meteor.Error('application-cost-not-installed', 'Application cost not installed');
        else
            return responce;
    },
    upsertApplicationChargeStatus(inSalesId) {
        const data = {
            recurring_application_charge: {
                monthly: config.monthlyCost,
                trial_expired_at: new Date().toISOString().substr(0, 10),
            }
        };

        /*const result = inSalesApiPost(inSalesId, 'recurring_application_charge.json', data);
        if(result && result.statusCode === 201) {
            Shops.update(
                {inSalesId: inSalesId},
                {$set: {webhookId: result.data.id}}
            );
            return true;
        }
        else return false;*/
    }
});