import * as rp from 'request-promise';
import * as functions from 'firebase-functions';
import { stripe, db, auth, stripeClientId, stripeSecret } from './config';

import * as CORS from 'cors';
import * as qs from 'querystring';

const cors = CORS({ origin: true });


    

///// STRIPE CONNECT /////

// Redirects the user to login with their stripe account
export const redirect = functions.https.onRequest((req, res) => {
    
    const base = 'https://connect.stripe.com/oauth/authorize?';
    const queryParams = { 
        client_id: stripeClientId,
        response_type: 'code',
        scope: 'read_write',
    };
    const endpoint = base + qs.stringify( queryParams );
    res.redirect(endpoint);  
    
});

// OAuth Callback used to mint the auth token and create the Firebase user
export const callback = functions.https.onRequest((req, res) => {

    cors( req, res, () => { 
    
        const code = req.query.code;

        mintFirebaseToken(code)
            .then(token => res.status(200).send({ token }))
            .catch(err => res.status(400).send(err))
 
    });
    
});

/////// Connect Helpers /////

export async function mintFirebaseToken(code: string): Promise<any> {

    // Make a post request to Stripe's oauth token endpoint
    const options = {
        uri: 'https://connect.stripe.com/oauth/token',
        form: {
            grant_type: 'authorization_code',
            client_id: stripeClientId,
            code: code,
            client_secret: stripeSecret
        }
    };

    let stripeCredentials = await rp.post(options);
    stripeCredentials = JSON.parse(stripeCredentials);
    
    // Save the Stripe account ID and refresh token
    const accountId = stripeCredentials.stripe_user_id;
    const uid = 'stripe:' + accountId;

    const refreshToken = stripeCredentials.refresh_token ;

    // Mint a custom auth token
    const firebaseToken = await auth.createCustomToken(uid);

    // Retrieve the account details and update in Firestore
    const account = await stripe.accounts.retrieve(accountId);
    
    const userData = {
        uid,
        accountId,
        refreshToken,
        email: account.email,
        displayName: account.display_name,
    };

    await db.doc(`users/${uid}`).set(userData, { merge: true });
    
    return firebaseToken;
}