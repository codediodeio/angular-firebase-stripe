import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'connect-page',
  templateUrl: './connect-page.component.html',
  styleUrls: ['./connect-page.component.sass']
})
export class ConnectPageComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

}
