import { Component } from '@angular/core';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.sass']
})
export class NavBarComponent {

  isActive = false;

  constructor() { }

  toggleActive() {
    this.isActive = !this.isActive
  }

  setActive(state: boolean) {
    this.isActive = state
  }
}
