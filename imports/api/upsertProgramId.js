import { Meteor } from 'meteor/meteor';
import { Shops } from './publications.js';

Meteor.methods({
    upsertMegaplanProgramId(inSalesId, programId, ResponsibleManagerId) {
        Shops.upsert(
            {
                inSalesId
            },
            {
                $set: {
                    MegaplanApiProgramId: programId,
                    ResponsibleManagerId: ResponsibleManagerId
                }
            }
        );
    }
});
