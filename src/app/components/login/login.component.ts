import { Component, OnInit } from '@angular/core';
import { McarsService } from '../../services/mcars.service';
import { TokenService } from '../../services/token.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {


  public form = {
        email :null,
        password :null
  };
  public error = null;
  
  constructor(
      private mcars:McarsService,
      private token:TokenService,
      private router:Router,
      private auth:AuthService
   ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.mcars.login(this.form).subscribe(
       data => this.handleResponse(data), 
       error => this.handleError(error) 
    );
  }

  handleResponse(data){
    this.token.handle(data.access_token);
    this.auth.changeAuthStatus(true);
    this.router.navigateByUrl('/profile');
  }

  handleError(error){
    this.error = error.error.error;
  }
}
