import { megaplanApiCreateDeal } from './megaplanHttpRequest';

export const sendOrder = order => {
    const response = megaplanApiCreateDeal(order.account_id.toString(), data);
    //создать сделку
    return true;
}
