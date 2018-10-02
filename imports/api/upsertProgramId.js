import { Meteor } from 'meteor/meteor';
import { Shops } from './publications.js';

Meteor.methods({
    upsertMegaplanProgramId(inSalesId, programId) {
        Shops.upsert(
            {
                inSalesId
            },
            {
                $set: {
                    MegaplanApiProgramId: programId
                }
            }
        );
    }
});
