//// Initialize Express App and Middleware ////

import * as CORS from 'cors';
export const cors = CORS({ origin: true });

function corsMiddleware(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
}

import * as express from 'express';
export const app = express();

import { authenticateUser } from './helpers';

app.use(cors);
app.use(corsMiddleware)
app.use(authenticateUser);

//// Initialize Firebase ////

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

//// Service account required for Stripe Connect OAuth
const serviceAccount = require('../../credentials.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://stripe-elements.firebaseio.com"
});

 
//// If not using Stripe Connect, initialize without service account
// admin.initializeApp(functions.config().firebase);

export const db     = admin.firestore();
export const auth   = admin.auth();


//// Initalize Stripe NodeJS SDK ////

import * as Stripe from 'stripe'; 

// Possible bug with v1.0 and firebase-tools CLI
// export const stripeSecret       = functions.config().stripe.secret;
// export const stripePublishable  = functions.config().stripe.publishable;
// export const stripeClientId     = functions.config().stripe.clientid; // only used for stripe connect


export const stripeSecret       = serviceAccount.stripe.secret;
export const stripePublishable  = serviceAccount.stripe.publishable;
export const stripeClientId     = serviceAccount.stripe.clientid; 

export const stripe = new Stripe(stripeSecret);

