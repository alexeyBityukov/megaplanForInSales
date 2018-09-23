import { Meteor } from 'meteor/meteor';
import { config } from '../config.js';
import { Shops } from './publications.js';

export const errorCodeEmptyQuery = 'empty-query';
export const errorCodeEmptyAppSecretKey = 'empty-appSecretKey';

const md5 = require('md5');

Meteor.methods({
  install(shopURL, token, inSalesId) {
       if(!(shopURL && token && inSalesId))
          throw new Meteor.Error(errorCodeEmptyQuery, 'Empty query');

      if(!config.appSecretKey)
          throw new Meteor.Error(errorCodeEmptyAppSecretKey, 'Empty field appSecretKey in config file');

      let appSecretKey = config.appSecretKey;
      let inSalesApiPassword = md5(token + appSecretKey);

      Shops.upsert(
          {
              inSalesId: inSalesId
          },
          {
              inSalesApiPassword: inSalesApiPassword,
              inSalesId,
              shopURL,
              createdAt: new Date(),
          }
      );
  }
});
