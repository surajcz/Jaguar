import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ImagePickerComponent } from '../components/image-picker/image-picker.component';

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

}
