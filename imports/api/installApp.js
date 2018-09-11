import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { config } from '../config.js'

const Shops = new Mongo.Collection('shops');
const md5 = require('md5');

/*if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('tasks', function tasksPublication() {
    return Tasks.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}*/

Meteor.methods({
  install(shopURL, token, inSalesId) {
      if(!(shopURL && token && inSalesId))
          throw new Meteor.Error('empty-query', 'Empty query');

      if(!config.appSecretKey)
          throw new Meteor.Error('empty-appSecretKey', 'Empty field appSecretKey in config file');

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

      return true;
  }
});
