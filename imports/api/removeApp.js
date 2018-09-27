import { Meteor } from 'meteor/meteor';
import { Shops } from './publications.js';

Meteor.methods({
    remove(inSalesId) {
        Shops.remove(
            {
                inSalesId
            }
        );
    }
});
