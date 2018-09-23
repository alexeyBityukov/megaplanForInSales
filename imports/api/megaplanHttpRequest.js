import { Meteor } from 'meteor/meteor';
const md5 = require('md5');
import { config } from '../config.js';
//import { Shops } from './publications.js';

export const megaplanApiAuthorization = (login, password, baseUrl,) => {
    const params = {
        Login: login,
        Password: md5(password)
    };
    return megaplanApiRequest('GET', baseUrl, {}, {'Content-Type': 'application/json'}, params);
};

/*export const inSalesApiPost = (inSalesId, url, data) => {
    return inSalesApiRequest('POST', inSalesId, url, data);
};*/


const megaplanApiRequest = (type, baseUrl, data, headers, params) => {
    if(params === undefined)
        params = {};
    //const shop = Shops.findOne({inSalesId : inSalesId});
    const fullUrl = `${baseUrl}${config.megaplanApiAuthorizationUrl}`;
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
