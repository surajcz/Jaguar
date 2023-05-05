import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-level102',
  templateUrl: './level102.component.html',
  styleUrls: ['./level102.component.scss'],
})
export class Level102Component implements OnInit {
  randomNum: any;

  constructor(
    private events: EventsService,
  ) { }

  ngOnInit() {
    this.events.subscribe('random', (val) => {
      this.randomNum = Math.floor(val);
    })
    // this.obs.subscribe(
    //   val => { console.log(val) }, //next callback
    //   error => { console.log("error") }, //error callback
    //   () => { console.log("Completed") } //complete callback
    // )
  }

}
