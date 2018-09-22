import { Meteor } from 'meteor/meteor';
import { Shops } from './publications.js';
import { publishShops } from '../api/publications.js';
import { inSalesApiGet } from '../api/httpRequests.js';
import { config } from '../config.js';

export const webhookInstallStatuses = {
    notFindWebhookId: 'Идентификатор отсутствует',
    webhookIdInvalid: 'Ненайден',
    webhookIdValid: 'Установлен',
    unknownError: 'Неизвесная ошибка',
    webhookInstallingError: 'Ошибка при установке'
};
export const unknownErrorOnCheckingWebhookId = 'unknown-error-on-checking-webhook-id';

publishShops();

Meteor.methods({
    webhookIdIsValid(inSalesId, webhookId) {
        return inSalesApiGet(inSalesId, `webhooks/${webhookId}.json`);
    },

    installWebhook(inSalesId, passwordForApi, shopURL) {
        let updateWebhook = (webhookId, webhookInstallStatus) => {
            Shops.update({
                inSalesId: inSalesId
            },
            {
                $set: {
                    webhookId: webhookId,
                    webhookInstallStatus: webhookInstallStatus
                }
            });
        };

        if(Meteor.isServer) {
            try {
                const url = `${config.requestProtocol}://@${shopURL}/admin/webhooks.json`;
                HTTP.call('POST', url, {
                    auth: config.applicationId + ':' + passwordForApi,
                    headers: {'Content-Type': 'application/json'},
                    data: {
                        webhook: {
                            address: config.webhookURL,
                            topic: "orders/create",
                            format_type: "json"
                        }
                    }
                }, (error, result) => {
                    let status = '';
                    if (!error && result.statusCode === 201) {
                        status = webhookInstallStatuses.webhookIdValid;
                    }
                    else
                        status = webhookInstallStatuses.webhookInstallingError;
                    updateWebhook(result.data.id, status);
                });
            }
            catch (e) {
                updateWebhook(result.data.id, webhookInstallStatuses.webhookInstallingError);
            }
        }
    }
});