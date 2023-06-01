import { EventsService } from './../services/events.service';
import { AuthenticationService } from './../services/authentication.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ImagePickerComponent } from '../components/image-picker/image-picker.component';

import { Chooser } from '@ionic-native/chooser/ngx';
import { FilePath } from '@awesome-cordova-plugins/file-path/ngx';
import { FilePicker } from '@robingenz/capacitor-file-picker';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  names = ['Dr. IQ', '   ', '  Bombasto  '];
  agreed = 0;
  disagreed = 0;
  voters = ['Dr. IQ', 'Celeritas', 'Bombasto'];
  resetCount = false;

  constructor(
    private modalCtrl: ModalController,
    private events: EventsService,
    private authService: AuthenticationService,
    private router: Router,
    public chooser: Chooser,
    public filePath: FilePath
  ) { }

  onVoted(data: any) {
    if (data.agreed) {
      this.agreed++;
    } else {
      this.disagreed++;
    }
    if (data.resetCount) {
      this.resetCount = false;
    }
  }

  reset() {
    this.agreed = 0;
    this.disagreed = 0;
    this.resetCount = true;
    this.events.publish('resetCount', '0');
  }

  async openModal(val: any) {
    let component: any;
    if (val == 'image-picker') {
      component = ImagePickerComponent;
    }
    const modal = await this.modalCtrl.create({
      component: component,
    });
    modal.present();

  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }




  async openFileSystem() {
    const result = await FilePicker.pickFiles({
      types: [],
      multiple: false,
    });
    console.log('result', result)
    // this.chooser.getFileMetadata().then((file) => {
    //   console.log('file', file);
    //   let uri: any = file?.uri;
    //   this.filePath.resolveNativePath(uri).then(async (fp) => {
    //     console.log('fp', fp);
    //   })
    // })

  }

  saveAsMp3(event: any) {
    console.log('event>>>>>>', event);
  }

}
