import { stripe, db, auth } from './config';


/////  USER MANAGEMENT ///////

// Authenticates Firebase user on HTTP functions, used as expressJS middleware
export function authenticateUser(req, res, next): void {
    
    let authToken;

    if ( req.headers.authorization && req.headers.authorization.startsWith('Bearer ') ) {
        authToken = req.headers.authorization.split('Bearer ')[1];
    } else {
        res.status(403).send('Must provide a header that looks like "Authorization: Bearer <Firebase ID Token>"');
    }

    auth.verifyIdToken(authToken)
        .then(decodedToken => { 
            req.user = decodedToken;
            next();
        })
        .catch(err => res.status(403).send(err))
}

// Returns the user document data from Firestore
export async function getUser(userId: string): Promise<any> {
    return await db.collection('users').doc(userId).get().then(doc => doc.data());
}

// Takes a Firebase user and creates a Stripe customer account
export async function createCustomer(firebaseUser: any): Promise<any> {
        
    return await stripe.customers.create({
        email: firebaseUser.email,
        metadata: { firebaseUID: firebaseUser.uid }
    })
    
}


export async function getCustomer(userId: string): Promise<any> {
    
    const user       = await getUser(userId);
    const customerId = user.stripeCustomerId;

    return await stripe.customers.retrieve(customerId);
}


/////  CHARGES and SOURCES ///////
    
// Looks for payment source attached to user, otherwise it creates it. 
export async function attachSource(userId: string, sourceId: string): Promise<any> {

    const customer = await getCustomer(userId);

    const existingSource = customer.sources.data.filter(source => source.id === sourceId).pop() 

    if (existingSource) {
        return existingSource;
    } 
    else {
        return await stripe.customers.createSource(customer.id, { source: sourceId });
    }
}


// Charges customer with supplied source and amount 
export async function createCharge(userId: string, sourceId: string, amount: number, currency? :string): Promise<any> {

    const user       = await getUser(userId);
    const customerId = user.stripeCustomerId;

    const card       = await attachSource(userId, sourceId)
    
    return await stripe.charges.create({
        amount: amount,
        currency: currency || 'usd',
        customer: customerId,
        source: sourceId
    })
}


/////  RETRIEVE DATA from STRIPE ///////

// Returns all charges associated with a user/customer
export async function getUserCharges(userId: string, limit?: number): Promise<any> {
    
    const user       = await getUser(userId);
    const customerId = user.stripeCustomerId;

    return await stripe.charges.list({ 
        limit, 
        customer: customerId 
    });
}

/////  SUBSCRIPTIONS ///////


// Creates a subscription
export async function createSubscription(userId:string, sourceId:string, planId: string): Promise<any> {

 
    const user       = await getUser(userId);
    const customerId = user.stripeCustomerId;

    const card       = await attachSource(userId, sourceId)

    const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [
            {
              plan: planId,
            },
        ]
    });

    // Add the plan to existing subscriptions
    const subscriptions = { 
        [planId]: 'active'
    };

    await db.doc(`users/${userId}`).set({ subscriptions }, { merge: true });

    return subscription;
}



// Cancel/pause a subscription
export async function cancelSubscription(userId: string, planId: string): Promise<any> {

    const subscription   = await getSubscription(userId, planId);

    let cancellation; 

    // Possible cancellation already occured in Stripe
    if (subscription) {
        cancellation  = await stripe.subscriptions.del(subscription.id);
    }

    const subscriptions = { 
        [planId]: 'cancelled'
    };

    await db.doc(`users/${userId}`).set({ subscriptions }, { merge: true });

    return cancellation;

}

// recurringPayment is called by a Stripe webhook

export async function recurringPayment(customerId: string, planId: string, hook: string): Promise<any> {

    const customer = await stripe.customers.retrieve(customerId);
    const userId = customer.metadata.firebaseUID

    let status;

    // Payment succeeded
    if (hook === 'invoice.payment_succeeded') {
        status = 'active';
    };

    // Payment failed
    if (hook === 'invoice.payment_failed') {
        status = 'cancelled';
    };

    const subscriptions = { 
        [planId]: status
    };

    return await db.doc(`users/${userId}`).set({ subscriptions }, { merge: true });
}


export async function getSubscription(userId: string, planId: string): Promise<any> {
    const user       = await getUser(userId)
    const customer   = user.stripeCustomerId

    const stripeSubs     = await stripe.subscriptions.list({ customer, plan: planId })
    return stripeSubs.data[0]
}
