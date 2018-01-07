import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/observable/fromPromise';

import { User } from './user';

@Injectable()
export class AuthService {

  user: Observable<User>;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {

      //// Get auth data, then get firestore user document || null
      this.user = this.afAuth.authState.pipe(
        switchMap(user => {
          if (user) {
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
          } else {
            return Observable.of(null)
          }
        })
      )
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then(credential => {
        this.updateUserData(credential.user)
      })
  }

  anonymousLogin() {
    return this.afAuth.auth.signInAnonymously()
    .then(user => {
      this.updateUserData(user)
    })
  }

    // Sets user data to firestore on login
  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName || null,
      photoURL: user.photoURL || null
    }
    return userRef.set(data, { merge: true })
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
        this.router.navigate(['/']);
    });
  }

  // Used by the http interceptor to set the auth header
  getUserIdToken(): Observable<string> {
    return fromPromise ( this.afAuth.auth.currentUser.getIdToken() );
  }

  
  ///// STRIPE CONNECT //////


  // Login popup window
  stripeLogin() {
    const popup = window.open(`${environment.functionsURL}/stripeRedirect`, '_blank', 'height=700,width=800')
  }
  // Signin with a custom token from 
  customSignIn(token) {
    return this.afAuth.auth.signInWithCustomToken(token).then(() => window.close())
  }

}