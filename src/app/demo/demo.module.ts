import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChargeCardComponent } from './charge-card/charge-card.component';
import { ReadMeComponent } from './read-me/read-me.component';
import { PaymentModule } from '../payment/payment.module';
import { SaveCardComponent } from './save-card/save-card.component';
import { SubscriptionPageComponent } from './subscription-page/subscription-page.component';
import { StripeDashboardComponent } from './stripe-dashboard/stripe-dashboard.component';
import { ConnectPageComponent } from './connect-page/connect-page.component'

@NgModule({
  imports: [
    CommonModule,
    PaymentModule
  ],
  declarations: [
    ChargeCardComponent, 
    ReadMeComponent, 
    SaveCardComponent, 
    SubscriptionPageComponent, 
    StripeDashboardComponent, 
    ConnectPageComponent
  ],
})
export class DemoModule { }
