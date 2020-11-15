import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
// Firebase setup instructions
// 1. delete this line, then...
import { firebaseConfig } from '../../env';
import { AuthGuard } from './auth.guard';
// 2. Add your own firebase config to environment.ts
// 3. Then use it to initialize @angular/fire below, like so AngularFireModule.initializeApp(environment.firebaseConfig),
import { AuthService } from './auth.service';
import { TokenInterceptor } from './token.interceptor';







@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  declarations: [],
  providers: [
    AuthService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ]
})
export class CoreModule { }
