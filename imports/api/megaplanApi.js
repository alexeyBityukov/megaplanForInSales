import {Meteor} from 'meteor/meteor';
import { megaplanApiAuthorization } from "./megaplanHttpRequest";
import {Shops} from './publications';

export const errorCodeInvalidMegaplanAuthData = 'invalid-auth-data';

Meteor.methods({
    upsertMegaplanApiData(inSalesId, login, password, baseUrl) {
        if(Meteor.isServer) {
            try {
                const response = megaplanApiAuthorization(login, password, baseUrl);
                if(response && response.statusCode === 200 && response.data.status.code === 'ok') {
                    Shops.upsert({
                            inSalesId: inSalesId
                        },
                        {
                            $set: {
                                megaplanApiLogin: login,
                                megaplanApiPassword: password,
                                megaplanApiBaseUrl: baseUrl,
                            }
                        }
                    );
                    return true;
                }
                else
                    return false;
            }
            catch (e) {
                throw new Meteor.Error(errorCodeInvalidMegaplanAuthData, 'Invalid megaplan authentication data');
            }
        }
    },
    isValidMegaplanApiData(inSalesId) {
        if(Meteor.isServer)
            try {
                const shop = Shops.findOne({inSalesId : inSalesId});
                const response = megaplanApiAuthorization(shop.megaplanApiLogin, shop.megaplanApiPassword, shop.megaplanApiBaseUrl);
                return !!(response && response.statusCode === 200 && response.data.status.code === 'ok');
            }
            catch (e) {
                throw new Meteor.Error(errorCodeInvalidMegaplanAuthData, 'Invalid megaplan authentication data');
            }
            return true;
    }
});