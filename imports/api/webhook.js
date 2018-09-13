import { Meteor } from 'meteor/meteor';
import { Shops, publishShops } from './publications.js';

publishShops();

Meteor.methods({
    /*install(shopURL, token, inSalesId) {
        if(!(shopURL && token && inSalesId))
            throw new Meteor.Error(errorCodeEmptyQuery, 'Empty query');

        if(!config.appSecretKey)
            throw new Meteor.Error(errorCodeEmptyAppSecretKey, 'Empty field appSecretKey in config file');

        let appSecretKey = config.appSecretKey;
        let passwordForApi = md5(token + appSecretKey);

        Shops.upsert(
            {
                inSalesId: inSalesId
            },
            {
                passwordForApi,
                inSalesId,
                shopURL,
                createdAt: new Date(),
            }
        );
    }*/
});