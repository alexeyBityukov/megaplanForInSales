import { Meteor } from 'meteor/meteor';
import { config } from '../config.js';
import { Shops } from './publications.js';
import { publishShops } from '../api/publications.js';

export const webhookInstallStatuses = {
    notFindWebhookId: 'Идентификатор отсутствует',
    webhookIdInvalid: 'Ненайден',
    webhookIdValid: 'Установлен',
    unknownError: 'Неизвесная ошибка',
    webhookInstallingError: 'Ошибка при установке'
};

publishShops();

Meteor.methods({
    webhookIdIsValid(inSalesId, webhookId, passwordForApi, shopURL) {
        let setWebhookInsatallStatus = (newStatus) => {
            Shops.update({
                    inSalesId: inSalesId
                },
                {
                    $set: {webhookInstallStatus: newStatus}
                });
         };
        if(Meteor.isServer) {
            try {
                const url = `${config.requestProtocol}://${shopURL}/admin/webhooks/${webhookId}.json`;
                HTTP.call('GET', url, {
                    auth: config.applicationId + ':' + passwordForApi,
                    headers: {'Content-Type': 'application/json'}
                }, (error, result) => {
                    if(result.statusCode === 200)
                        setWebhookInsatallStatus(webhookInstallStatuses.webhookIdValid);
                    else if(result && result.statusCode && result.statusCode === 404)
                        setWebhookInsatallStatus(webhookInstallStatuses.webhookIdInvalid);
                    else
                        setWebhookInsatallStatus(webhookInstallStatuses.unknownError);
                });
            } catch (e) {
                setWebhookInsatallStatus(webhookInstallStatuses.unknownError);
            }
        }
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