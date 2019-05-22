import { Component, OnInit } from '@angular/core';
import { McarsService } from '../../../services/mcars.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.sass']
})
export class RequestResetComponent implements OnInit {
  public form ={
     email:null
  };
  constructor(
    private mcars:McarsService,
    private notify :SnotifyService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.notify.info('Wait...',{timeout:5000});
    this.mcars.sendPasswordResetLink(this.form).subscribe(
      data=>this.handleResponse(data),
      error=>this.notify.error(error.error.error)
    );
  }

  handleResponse(res){
    this.notify.success(res.data,{timeout:0});
    this.form.email = null;
  }

}
