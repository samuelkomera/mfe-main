import { Component, OnInit } from '@angular/core';
import { McarsService } from '../../services/mcars.service';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {
  public form = {
     email :null,
     name  :null,
     password : null,
     password_confirmation :null
  };
  constructor(
    private mcars:McarsService,
    private token:TokenService,
    private router:Router,
  ) { }

  public error = [];

  ngOnInit() {
  }

  onSubmit() {
    this.mcars.signup(this.form).subscribe(
       data => this.handleResponse(data), 
       error => this.handleError(error) 
    );  
  }
  handleResponse(data){
    this.token.handle(data.access_token);
    this.router.navigateByUrl('/profile');
  }

  handleError(error){
    this.error = error.error.errors;
  }

}
