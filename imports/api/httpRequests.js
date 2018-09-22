import { Meteor } from 'meteor/meteor';
import { config } from '../config.js';
import { Shops } from './publications.js';

export const unknownErrorOnApiInSalesRequest = 'unknown-error-on-api-insales-request';

export const inSalesApiGet = (inSalesId, url) => {
    inSalesApiRequest('GET', inSalesId, url);
    return true;
};

const inSalesApiRequest = (type, inSalesId, url) => {
    const shop = Shops.findOne({inSalesId : inSalesId});
    const fullUrl = `${config.requestProtocol}://${shop.shopURL}/admin/${url}`;
    if(Meteor.isServer) {
        try {
            const response = HTTP.call(type, fullUrl, {
                auth: config.applicationId + ':' + shop.passwordForApi,
                headers: {'Content-Type': 'application/json'}
            });

            if(response && response.statusCode) {
                if(response.statusCode === 200)
                    return response;
                else {
                    let error = new Error(response.message);
                    error.response = response;
                    throw error;
                }
            }
            else
                throw new Error('Query response no found');

        } catch (e) {
            if(e.response !== undefined && 'statusCode' in e.response)
                throw new Meteor.Error( e.response.statusCode, e.message);
            else throw new Meteor.Error(unknownErrorOnApiinSalesRequest, e.message);
        }
    }
};
