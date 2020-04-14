import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SignupLoginService } from './signup-login.service';
import { SocketService } from '../socket/socket.service';

@Component({
  selector: 'app-signup-login',
  templateUrl: './signup-login.page.html',
  styleUrls: ['./signup-login.page.scss'],
})
export class SignupLoginPage implements OnInit {

  title: string;
  personForm: FormGroup;
  endPoint: string;

  constructor(private fb: FormBuilder, private service: SignupLoginService, private router: Router, private socketService: SocketService) { }

  ngOnInit() {
    this.title = 'Sign Up';
    this.endPoint = 'signup';
    this.personForm = this.fb.group({
      displayName: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  Submit() {
    if (this.personForm.valid) {
      this.service.postData(this.endPoint, this.personForm.value).subscribe(response => {
        this.changeToLogin(response);
      }, error => {
        console.log(error);
      })
    }
  }

  changeToLogin(user?) {
    if (this.endPoint === 'signup') {
      this.title = 'Login';
      this.endPoint = 'login';
      this.personForm.removeControl('displayName');
      this.personForm.reset();
    } else {
      this.socketService.initialize(user.mobileNumber);
      localStorage.setItem('token', user.token);
      localStorage.setItem('mobileNumber', user.mobileNumber);
      this.router.navigateByUrl('home');
    }
  }

}
