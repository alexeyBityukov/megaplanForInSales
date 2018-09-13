import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { config } from '../config.js'

export const Shops = new Mongo.Collection('shops');
export const errorCodeEmptyQuery = 'empty-query';
export const errorCodeEmptyAppSecretKey = 'empty-appSecretKey';

const md5 = require('md5');

if (Meteor.isServer) {
  Meteor.publish('shops', function(inSalesId) {
      return Shops.find({inSalesId: inSalesId});
  });
}

Meteor.methods({
  install(shopURL, token, inSalesId) {
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
  }
});
