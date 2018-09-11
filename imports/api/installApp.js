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
  'install': function(shopURL, token, inSalesId) {
      if(shopURL && token && inSalesId)
          throw new Meteor.Error('empty-query', 'Empty query');

      //let appSecretKey = '';

      //let pass = md5(token + appSecretKey);
      console.log(config);
      let pass = config.test;
      Shops.insert({
          pass,
          inSalesId,
          shopURL,
          createdAt: new Date(),
      });

    //throw new Meteor.Error(500, 'Internal server error');
    return true;
  }
});
