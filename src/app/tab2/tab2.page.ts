import { Component } from '@angular/core';
import { Vibration } from '@ionic-native/vibration/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  fontColor = 'blue';
  sayHelloId = 1;
  canClick = false;
  message = 'Hello, World';
  birthday = new Date(1999, 1, 28);

  constructor(
    private vibration: Vibration
  ) { }

  sayMessage() {
    alert(this.message);
  }

  invokeVibration(durationInMs: any) {
    this.vibration.vibrate(durationInMs);
  }
  vibratePattern(pattern: any) {
    this.vibration.vibrate(pattern);
  }
  reovkeVibration() {
    this.vibration.vibrate(0);
  }

}
