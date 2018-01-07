import { Component, OnInit, Input } from '@angular/core';
import { PaymentService } from '../payment.service';
import { switchMap, tap, map } from 'rxjs/operators';
import { AuthService } from '../../core/auth.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'subscription-plan',
  templateUrl: './subscription-plan.component.html',
  styleUrls: ['./subscription-plan.component.sass']
})
export class SubscriptionPlanComponent implements OnInit {

  @Input() planId: string;
  @Input() sourceId: string;
  
  subscriptions$: Observable<any>;
  loading = false;

  constructor(public pmt: PaymentService, public auth: AuthService) { }

  ngOnInit() {
    this.subscriptions$ = this.auth.user.map( user => user.subscriptions || {} )
  }

  createHandler() {
    this.loading = true
    this.pmt.attachSubscription(this.sourceId, this.planId).subscribe(data => {
      this.loading = false
    });
  }

  cancelHandler() {
    this.loading = true
    this.pmt.cancelSubscription(this.planId).subscribe(data => {
      this.loading = false
    });
  }

}
