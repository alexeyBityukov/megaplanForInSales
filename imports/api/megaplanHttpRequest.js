import { Meteor } from 'meteor/meteor';
const md5 = require('md5');
import { config } from '../config.js';
import { Shops } from './publications.js';

export const megaplanApiAuthorization = (login, password, baseUrl) => {
    const params = {
        Login: login,
        Password: md5(password)
    };
    const fullUrl = `${baseUrl}${config.megaplanApiAuthorizationUrl}`;
    return megaplanApiRequest('GET', fullUrl, {}, {'Content-Type': 'application/json'}, params);
};

export const megaplanApiCreateDeal = (inSalesId, data) => {
    return megaplanApiPost(inSalesId, config.megaplanApiCreateDeal, data)
};

const megaplanApiPost = (inSalesId, url, data) => {
    const shop = Shops.findOne({inSalesId});
    const fullUrl = `${shop.megaplanApiBaseUrl}${config.megaplanApiAuthorizationUrl}`;
    const method = 'POST';
    return megaplanApiRequest('POST', fullUrl, {}, {'Content-Type': 'application/json'}, params);
};


const megaplanApiRequest = (type, fullUrl, data, headers, params) => {
    if(params === undefined)
        params = {};
    if(Meteor.isServer) {
        try {
            const response = HTTP.call(type, fullUrl, {
                headers: headers,
                data: data,
                params: params
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
            throw new Meteor.Error( e.response.statusCode, e.message);
        }
    }
};
