import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'subscription-page',
  templateUrl: './subscription-page.component.html',
  styleUrls: ['./subscription-page.component.sass']
})
export class SubscriptionPageComponent implements OnInit {

  sourceId: string;

  userSubscriptions;

  constructor() { }

  ngOnInit() {
  }

  setSource(e) {
    this.sourceId = e.id
  }

}
