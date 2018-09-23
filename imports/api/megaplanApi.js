import {Meteor} from 'meteor/meteor';
import {inSalesApiGet, inSalesApiPost} from './inSalesHttpRequests';
import {config} from '../config';
import {Shops} from './publications';

export const errorCodeInvalidMegaplanAuthData = 'invalid-auth-data';

Meteor.methods({
    upsertMegaplanApiData(login, password) {
        if(Meteor.isServer)
            return true;
            //throw new Meteor.Error(errorCodeInvalidMegaplanAuthData, 'Invalid megaplan authentication data');
    },
    isValidMegaplanApiData(inSalesId) {
        if(Meteor.isServer)
            throw new Meteor.Error(errorCodeInvalidMegaplanAuthData, 'Invalid megaplan authentication data');
    }
});