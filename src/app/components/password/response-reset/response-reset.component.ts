import { Component, OnInit } from '@angular/core';
import { McarsService } from '../../../services/mcars.service';
import { TokenService } from '../../../services/token.service';
import { AuthService } from '../../../services/auth.service';
import { Router,ActivatedRoute  } from '@angular/router';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.sass']
})
export class ResponseResetComponent implements OnInit {
  
  public error = [];
  public form  = {
    email : null,
    password :null,
    password_confirmation:null,
    resetToken:null
  }
  constructor(
    private route:ActivatedRoute,
    private mcars:McarsService,
    private token:TokenService,
    private router:Router,
    private auth:AuthService,
    private notify:SnotifyService
  ) { 
    route.queryParams.subscribe(params => {
        this.form.resetToken = params['token'];
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.mcars.changePassword(this.form).subscribe(
       data => this.handleResponse(data), 
       error => this.handleError(error) 
    );
  }

  handleResponse(data){
    let _router = this.router;
    this.notify.confirm('Done! Now login with new password',{
      buttons:[
        {
          text: 'Okay',
          action:toster => {
            _router.navigateByUrl('/login'),
             this.notify.remove(toster.id)
          }
        }
      ]
    })
  }

  handleError(error){
    this.error = error.error.errors;
  }

}
