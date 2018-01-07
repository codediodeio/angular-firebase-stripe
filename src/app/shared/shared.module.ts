import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms'

import { UserLoginComponent } from './user-login/user-login.component';
import { StripePipe } from './stripe.pipe';
import { KeysPipe } from './keys.pipe';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  declarations: [UserLoginComponent, StripePipe, KeysPipe, LoadingSpinnerComponent, NavBarComponent],
  exports: [UserLoginComponent, StripePipe, FormsModule, KeysPipe, LoadingSpinnerComponent, NavBarComponent]
})
export class SharedModule { }
