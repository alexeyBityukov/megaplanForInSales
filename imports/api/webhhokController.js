import { Meteor } from 'meteor/meteor';
import { Shops } from './publications';
import { inSalesApiGet } from './inSalesHttpRequests';

Meteor.methods({
    webhookController(order) {
        const applicationIsCharge = inSalesId => {
            const shop = Shops.findOne({inSalesId});
            if(!shop.lockDate)
                return false;
            const lockDate = new Date(shop.lockDate);
            lockDate.setDate(lockDate.getDate() + 1);
            const now = new Date();
            return 0 < lockDate.valueOf() - now.valueOf();
        };

        const sendOrder = () => {
            return true;
        };

        const inSalesId = order.account_id.toString();
        if(!applicationIsCharge(inSalesId)) {
            try {
                const response = inSalesApiGet(order.account_id.toString(), 'recurring_application_charge.json');
                if (response && 'data' in response && response.data.monthly !== null) {
                    Shops.upsert(
                        { inSalesId },
                        { $set: { lockDate: response.data.paid_till}}
                    );
                    if(applicationIsCharge(inSalesId)) {
                        sendOrder();
                        return true;
                    }
                    else
                        return false;
                }
                else
                    return false;
            }
            catch (e) {
                return false;
            }
        }
        else {
            sendOrder();
            return true;
        }
    }
});
