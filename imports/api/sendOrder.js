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
                        this.adminId = resp.employee_id;
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
        this.megaplanRequest(() => {
            const deal = {
                ProgramId: this.program,
                Model: {
                    Contractor: this.userId
                }
            };
            this.client.deal_save(deal).send(resp => {
                if(resp !== undefined && 'deal' in resp && 'id' in resp.deal && resp.deal.id !== undefined) {
                    this.dealId = resp.deal.id;
                    this.addPositionInDeal();
                }
                else
                    throw Error('Error on create deal');
            }, err => {
                this.toLog(err);
            });
        });
    };

    addPositionInDeal = () => {
        this.megaplanRequest(() => {
            const deal = {
                Id: this.dealId,
                Positions: this.transformPositions(),
                Model: {
                    Description: `Адресс доставки: ${this.order.shipping_address.full_delivery_address}\nКомментарий к заказу: ${this.order.comment}`
                }
            };
            this.client.deal_save(deal).send(resp => {
                this.createTask();
            }, err => {
                this.toLog(err);
            });
        });
    };

    transformPositions = () => {
        let positions = [];
        this.order.order_lines.forEach(position => {
            positions.push({
                Name: position.title,
                Count: position.quantity,
                Price: {
                    Value: position.sale_price
                },
                DiscountType: 2,
                DiscountValue: {
                    Value: position.discounts_amount
                }
            });
        });
        positions.push({
            Name: 'Доставка: ' + this.order.delivery_title,
            Count: 1,
            Price: {
                Value: this.order.full_delivery_price
            }
        });
        return positions;
    };

    createTask = () => {
        this.megaplanRequest(() => {
            const task = {
                Name: 'Обработать новый заказ из InSales',
                Responsible: this.adminId
            };
            this.client.task_create(task).send(resp => {
                if(resp !== undefined && 'id' in resp && resp.id !== undefined) {
                    this.taskId = resp.id;
                    this.linkingTaskWithDeal();
                }
                else
                    throw Error('Error on create task');
            }, err => {
                this.toLog(err);
            });
        });
    };

    linkingTaskWithDeal = () => {
        this.megaplanRequest(() => {
            this.client.save_relation(this.dealId, this.taskId, 'task').send(resp => {
            }, err => {
                this.toLog(err);
            });
        });
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
        //написать insalesid
    };
}
