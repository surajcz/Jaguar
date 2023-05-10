import { Component } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  name: any;
  email: any;
  image: any;

  constructor(
    private googlePlus: GooglePlus,
  ) { }

  googleLogin() {
    this.googlePlus.login({}).then(async (res: any) => {
      console.log(res);
      this.name = res.displayName;
      this.email = res.email;
      this.image = res.imageUrl;
    }).catch((err: any) => {
      console.error(err)
    });
  }


}
