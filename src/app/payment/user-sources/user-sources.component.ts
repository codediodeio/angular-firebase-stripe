import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentService } from '../payment.service';
import { Source, Customer } from '../models';

@Component({
  selector: 'user-sources',
  templateUrl: './user-sources.component.html',
  styleUrls: ['./user-sources.component.sass']
})
export class UserSourcesComponent implements OnInit {

  customer$: Observable<Customer>;

  @Input()  canSelect: boolean;
  @Output() selectedSource = new EventEmitter<Source>();

  constructor(private pmt: PaymentService) { }

  ngOnInit() {
    this.customer$ = this.pmt.getCustomer()
  }

  clickHandler(source: Source) {
    this.selectedSource.emit(source)
  }

}
