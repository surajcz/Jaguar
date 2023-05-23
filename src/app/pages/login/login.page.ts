import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
// import { AngularFireAuth } from '@angular/fire/compat/auth';

import { Storage } from '@capacitor/storage';
const TOKEN_KEY = 'fbase_key';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  credentials: FormGroup = new FormGroup({});
  userData: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController,
    // public ngFireAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['test@test.com', [Validators.required, Validators.email]],
      password: ['test123', [Validators.required, Validators.minLength(6)]]
    });
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.login(this.credentials.value.email, this.credentials.value.password);
    await loading.dismiss();
    console.log('user---------', user)

    this.userData = user;

    if (this.userData) {

      Storage.set({ key: TOKEN_KEY, value: this.userData.user.accessToken })
      this.router.navigateByUrl('/tabs', { replaceUrl: true });
    } else {
      alert('Login failed, Please try again!');
    }
  }

  // Easy access for form fields
  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }

  async googleLogin() {
    const user = await this.authService.googleAuth();
    console.log('user---------', user)
    if (user) {
      this.router.navigateByUrl('/tabs', { replaceUrl: true });
    } else {
      alert('Login failed, Please try again!');
    }
  }


  async facebookLogin() {
    const user = await this.authService.facebookAuth();
  }
}