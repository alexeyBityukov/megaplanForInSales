import {Meteor} from "meteor/meteor";
import {Shops} from "./publications";

const MegaplanApi = require ('megaplanjs');

//I am sorry for callback hell, but this lib not work with promise

export default class Megaplan {
    constructor(order) {
        try {
            this.order = order;
            this.inSalesId = order.account_id.toString();
            this.shop = Shops.findOne({inSalesId: this.inSalesId});
            this.client = new MegaplanApi.Client(this.shop.megaplanApiBaseUrl).auth(this.shop.megaplanApiLogin, this.shop.megaplanApiPassword);
        }
        catch (e) {
            this.toLog(e);
        }
    }

    sendOrder = () => {
        this.megaplanRequest(() => {
            Meteor.bindEnvironment(this.client.on('auth',  Meteor.bindEnvironment((resp, err) => {
                try {
                    if(err !== undefined)
                        throw new Error(err.message);
                    else {
                        this.getPrograms();
                    }
                }
                catch (e) {
                    this.toLog(e);
                }
            })))
        });
        return true;
    };

    getPrograms = () => {
        this.megaplanRequest(() => {
            this.client.programs({}).send(resp => {
                this.program = resp.programs[0].id;
                //set programs from settings app
                this.userPhoneIsUnic();
            }, err => {
                this.toLog(err);
            })
        });
    };

    userPhoneIsUnic = () => {
        this.megaplanRequest(() => {
            const userPhone = this.order.client.phone;
            this.client.contractors({Phone: userPhone}).send(resp => {
                if('0' in resp) {
                    this.userId = resp['0'].id;
                    this.createDeal();
                }
                else
                    this.userEmailIsUnic();

            }, err => {
                this.toLog(err);
            });
        });
    };

    userEmailIsUnic = () => {
        this.megaplanRequest(() => {
            const userEmail = this.order.client.email;
            this.client.contractors({Model: {Email: userEmail}}).send(resp => {
                if('0' in resp) {
                    this.userId = resp['0'].id;
                    this.createDeal();
                }
                else
                    this.createUser();

            }, err => {
                this.toLog(err);
            });
        });
    };

    createUser = () => {
        this.megaplanRequest(() => {
            const user = {
                Model: {
                    TypePerson: 'human',
                    FirstName: this.order.client.name,
                    Email: this.order.client.email,
                    Phones: [this.order.client.phone]
                }
            };
            this.client.contractor_save(user).send(resp => {
                if(resp !== undefined && 'contractor' in resp && 'id' in resp.contractor && resp.contractor.id !== undefined) {
                    this.userId = resp.contractor.id;
                    this.createDeal();
                }
                else
                    throw Error('Error on create user');
            }, err => {
                this.toLog(err);
            });
        });
    };

    createDeal = () => {
        const userId = this.userId;
        debugger;
        /*const deal = {
            ProgramId: this.program,
            Model: {
                Contractor: this.userId
            }
        };
        client.deal_save(deal).send(ok =>{}, err => {
            toLog(err);});*/
    };

    megaplanRequest = (method) => {
        try {
            method();
        }
        catch (e) {
            this.toLog(e);
        }
    };

    toLog = e => {
        debugger;
        console.log(e.message);
        //все ошибки в лог!
    };
}
