import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
// import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  credentials: FormGroup = new FormGroup({});

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
      email: ['eve.holt@reqres.in', [Validators.required, Validators.email]],
      password: ['cityslicka', [Validators.required, Validators.minLength(6)]]
    });
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();

    // this.authService.login(this.credentials.value).subscribe(
    //   async (res) => {
    //     await loading.dismiss();
    //     this.router.navigateByUrl('/tabs', { replaceUrl: true });
    //   },
    //   async (res) => {
    //     await loading.dismiss();
    //     const alert = await this.alertController.create({
    //       header: 'Login failed',
    //       message: res.error.error,
    //       buttons: ['OK']
    //     });

    //     await alert.present();
    //   }
    // );


    const user = await this.authService.login(this.credentials.value.email, this.credentials.value.password);
    await loading.dismiss();
    console.log('user---------', user)

    if (user) {
      this.router.navigateByUrl('/home', { replaceUrl: true });
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
    const user = await this.authService.login(this.credentials.value.email, this.credentials.value.password);
    console.log('user---------', user)
    if (user) {
      this.router.navigateByUrl('/home', { replaceUrl: true });
    } else {
      alert('Login failed, Please try again!');
    }
  }

  // AuthLogin(provider: any) {
  //   return this.ngFireAuth
  //     .signInWithPopup(provider)
  //     .then((result) => {
  //       console.log(result)
  //     })
  //     .catch((error) => {
  //       alert(error);
  //     });
  // }
}