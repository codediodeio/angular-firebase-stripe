import * as functions from 'firebase-functions';
import { stripe, db, stripeClientId } from './config';
import { createCustomer } from './helpers';

export const createStripeCustomer = functions.auth

    .user().onCreate((user, context) => {

        const userRef = db.collection('users').doc(user.uid);
        
        return createCustomer(user)

            .then(customer => {
                
                /// update Firestore with stripe customer id
                const data = { stripeCustomerId: customer.id }
                return userRef.set(data, { merge: true });
            })
            .catch(console.log)
    });




