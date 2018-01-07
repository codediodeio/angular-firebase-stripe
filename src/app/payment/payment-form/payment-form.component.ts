import {
  Component,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { NgForm } from '@angular/forms';
import { PaymentService } from '../payment.service';
import { Charge, Source } from '../models';

@Component({
  selector: 'payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.sass']
})
export class PaymentFormComponent implements AfterViewInit, OnDestroy {

  // Total amount of the charge
  @Input() totalAmount: number;

  // Emit result of operation to other components
  @Output() stripeResult = new EventEmitter<Charge | Source>();

  // Result used locacally to display status.
  result: Charge | Source;

  // The Stripe Elements Card
  @ViewChild('cardElement') cardElement: ElementRef;
  card: any;
  formError: string; 
  formComplete = false
  
  // State of async activity
  loading = false;

  constructor(private cd: ChangeDetectorRef, public pmt: PaymentService) { }

  ngAfterViewInit() {
    this.card = this.pmt.elements.create('card');
    this.card.mount(this.cardElement.nativeElement);

    // Listens to change event on the card for validation errors
    this.card.on('change', (evt) => {
      this.formError = evt.error ? evt.error.message : null
      this.formComplete = evt.complete
      this.cd.detectChanges()
    })
  }

  // Called when the user submits the form
  formHandler(): void {
    this.loading = true
    let action;

    if (this.totalAmount) {
      action = this.pmt.createCharge(this.card, this.totalAmount);
    } else {
      action = this.pmt.attachSource(this.card)
    }

    action.subscribe(
      data => {
        this.result = data
        this.stripeResult.emit(data)
        this.loading = false
      },
      err => {
        this.result = err
        this.loading = false;
      }
    );
  }


  ngOnDestroy() {
    this.card.destroy();
  }

}
