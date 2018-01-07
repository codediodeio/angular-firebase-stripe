import * as functions from 'firebase-functions';
import { db } from './config';

import {  recurringPayment } from './helpers';



export const recurringPaymentWebhook = functions.https.onRequest((req, res) => {

    const data        = req.body.data.object;
    const customerId  = data.customer;
    const planId      = data.lines.data[0].plan.id;
    const hook        = req.body.type;


    recurringPayment(customerId, planId, hook)
        .then(() => res.status(200).send(`successfully handled ${hook}`) )
        .catch(err => res.status(400).send(err))

});