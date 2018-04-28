# Full Stack Stripe Payments with Angular + Firebase

Learn to build a full-stack payment solution with the [onboarding course](https://projects.angularfirebase.com/p/stripe-payments-with-angular-and-firebase).

[Live Demo](https://stripe-elements.firebaseapp.com)

## Cloud Functions v1.0 Changes

https://firebase.google.com/docs/functions/beta-v1-diff

There is curretly bug preventing the CLI from reading Env vars in Node. As a workaround, add your Stripe API keys to credentials.json

```json
"stripe": {
    "publishable": "foo",
    "secret": "bar",
    "clientid": "baz"
}
```