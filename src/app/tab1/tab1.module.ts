import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { Level101Component } from '../components/level101/level101.component';
import { Level102Component } from '../components/level102/level102.component';
import { NameChildComponent } from '../components/name-child/name-child.component';
import { VoterComponent } from '../components/voter/voter.component';
import { ImagePickerComponent } from '../components/image-picker/image-picker.component';
import { NgxMicRecorderModule } from 'ngx-mic-recorder';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
    NgxMicRecorderModule
  ],
  declarations: [
    Tab1Page,
    Level101Component,
    Level102Component,
    NameChildComponent,
    VoterComponent,
    ImagePickerComponent
  ]
})
export class Tab1PageModule { }
