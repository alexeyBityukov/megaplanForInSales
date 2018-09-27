import { Meteor } from 'meteor/meteor';
import { config } from '../config.js';
import { Shops } from './publications.js';

export const unknownErrorOnApiInSalesRequest = 'unknown-error-on-api-insales-request';

export const inSalesApiGet = (inSalesId, url) => {
    return inSalesApiRequest('GET', inSalesId, url);
};

export const inSalesApiPost = (inSalesId, url, data) => {
    return inSalesApiRequest('POST', inSalesId, url, data);
};

const inSalesApiRequest = (type, inSalesId, url, data) => {
    const shop = Shops.findOne({inSalesId});
    const fullUrl = `${config.requestProtocol}://${shop.shopURL}/admin/${url}`;
    if(Meteor.isServer) {
        try {
            const response = HTTP.call(type, fullUrl, {
                auth: config.applicationId + ':' + shop.inSalesApiPassword,
                headers: {'Content-Type': 'application/json'},
                data: data
            });
            if(response && response.statusCode) {
                if(response.statusCode === 200 || response.statusCode === 201)
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
            else throw new Meteor.Error(unknownErrorOnApiInSalesRequest, e.message);
        }
    }
};
