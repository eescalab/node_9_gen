import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('myForm') form: NgForm;
  public message = 'Hola mundo';

  constructor(
    private loginservice: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login(myForm:NgForm) {
    

    this.loginservice.login(this.form.value.email, this.form.value.password)
      .subscribe(item => {

        this.router.navigateByUrl('/');
      }, (err) => {
    
        this.message = err.error.message;

      });

  }

}
