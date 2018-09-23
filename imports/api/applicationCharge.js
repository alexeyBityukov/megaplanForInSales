import { Meteor } from 'meteor/meteor';
import { Shops } from './publications.js';
import { inSalesApiGet, inSalesApiPost } from './inSalesHttpRequests.js';
import { config } from '../config.js';

Meteor.methods({
    getApplicationChargeStatus(inSalesId) {
        const response =  inSalesApiGet(inSalesId, 'recurring_application_charge.json');
        if(response && 'data' in response && response.data.monthly === null )
            throw new Meteor.Error('application-cost-not-installed', 'Application cost not installed');
        else
            Shops.upsert(
                {inSalesId: inSalesId},
                {$set: {lockDate: response.data.paid_till}}
            );
    },
    upsertApplicationChargeStatus(inSalesId) {
        let now = new Date();
        now.setDate(now.getDate() + 7);
        const data = {
            recurring_application_charge: {
                monthly: config.monthlyCost,
                trial_expired_at: now.toISOString().substr(0, 10),
            }
        };
        const response = inSalesApiPost(inSalesId, 'recurring_application_charge.json', data);
        if(response && response.statusCode === 201) {
            Shops.upsert(
                {inSalesId: inSalesId},
                {$set: {lockDate: response.data.paid_till}}
            );
            return true;
        }
        else return false;
    }
});