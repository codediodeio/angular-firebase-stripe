import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth.service';
import { PaymentService } from './payment/payment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {


  constructor(private auth: AuthService, private pmt: PaymentService) { }

  ngOnInit() { }


}
