import * as functions from 'firebase-functions';
import * as helpers from './helpers';
import * as connect from './connect';
import { app } from './config';

// POST Charge
app.post('/charges', (req, res) => {

    const userId   = req.user.uid;
    const sourceId = req.body.sourceId;
    const amount   = req.body.amount;
    const currency = req.body.currency;

    const promise = helpers.createCharge(userId, sourceId, amount, currency)
    defaultHandler(promise, res)
});

// GET User Charges
app.get('/charges', (req, res) => {
    
    const userId   = req.user.uid;

    const promise = helpers.getUserCharges(userId)
    defaultHandler(promise, res)
});


// POST sources
app.post('/sources', (req, res) => {
    
    const userId    = req.user.uid;
    const sourceId  = req.body.sourceId;

    const promise = helpers.attachSource(userId, sourceId)
    defaultHandler(promise, res)
    
});

// GET customer (includes source and subscription data)
app.get('/customer', (req, res) => {
    
    const userId   = req.user.uid;

    const promise = helpers.getCustomer(userId)
    defaultHandler(promise, res)
    
});

// POST subscriptions (creates subscription on user account)
app.post('/subscriptions', (req, res) => {
    
    const userId   = req.user.uid;
    const sourceId = req.body.sourceId;
    const planId   = req.body.planId;

    const promise = helpers.createSubscription(userId, sourceId, planId);

    defaultHandler(promise, res)
});

// PUT subscriptions (cancels subscription)
app.put('/subscriptions/cancel', (req, res) => {
    
    const userId   = req.user.uid;
    const planId   = req.body.planId;

    const promise = helpers.cancelSubscription(userId, planId);

    defaultHandler(promise, res)
});


// Default handling of response
function defaultHandler(promise: Promise<any>, res: any): void {
    promise
        .then(data => res.status(200).send(data) )
        .catch(err => res.status(400).send(err) )
}
    
export const api = functions.https.onRequest(app);