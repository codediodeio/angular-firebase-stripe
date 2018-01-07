import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';


@Component({
  selector: 'user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.sass']
})
export class UserLoginComponent implements OnInit {

  constructor(public auth: AuthService) { }
  

  ngOnInit() {
  }
}
