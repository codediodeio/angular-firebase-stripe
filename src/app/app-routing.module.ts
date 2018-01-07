import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChargeCardComponent } from './demo/charge-card/charge-card.component';
import { SaveCardComponent } from './demo/save-card/save-card.component';
import { ReadMeComponent } from './demo/read-me/read-me.component';
import { SubscriptionPageComponent } from './demo/subscription-page/subscription-page.component';
import { StripeDashboardComponent } from './demo/stripe-dashboard/stripe-dashboard.component';
import { ConnectPageComponent } from './demo/connect-page/connect-page.component';
import { ConnectRedirectComponent } from './payment/connect-redirect/connect-redirect.component';

import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
  { path: '', component: ReadMeComponent},
  { path: 'charge', component: ChargeCardComponent, canActivate: [AuthGuard]  },
  { path: 'save-card', component: SaveCardComponent, canActivate: [AuthGuard]  },
  { path: 'subscription', component: SubscriptionPageComponent, canActivate: [AuthGuard]  },
  { path: 'dashboard', component: StripeDashboardComponent, canActivate: [AuthGuard]  },

  // Stripe Connect
  { path: 'connect', component: ConnectPageComponent  },
  { path: 'redirect', component: ConnectRedirectComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
