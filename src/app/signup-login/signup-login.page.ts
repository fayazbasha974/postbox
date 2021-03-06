import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoaderService } from '../loader/loader.service';
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

  constructor(private fb: FormBuilder, private service: SignupLoginService, private router: Router, private socketService: SocketService, private loader: LoaderService) { }

  ngOnInit() {
    this.title = 'Sign Up';
    this.endPoint = 'signup';
    this.personForm = this.fb.group({
      displayName: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async Submit() {
    if (this.personForm.valid) {
      await this.loader.presentLoading();
      this.service.postData(this.endPoint, this.personForm.value).subscribe(response => {
        this.loader.dismissLoading();
        this.changeToLogin(response);
      }, error => {
        this.loader.dismissLoading();
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
