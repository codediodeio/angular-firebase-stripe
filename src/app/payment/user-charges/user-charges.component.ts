import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../payment.service';
import { Observable } from 'rxjs';
import { Charge } from '../models';

@Component({
  selector: 'user-charges',
  templateUrl: './user-charges.component.html',
  styleUrls: ['./user-charges.component.sass']
})
export class UserChargesComponent implements OnInit {

  charges$: Observable<Charge[]>;

  constructor(private pmt: PaymentService) { }

  ngOnInit() {
    this.charges$ = this.pmt.getCharges();
  }

}
