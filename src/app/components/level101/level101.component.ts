import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-level101',
  templateUrl: './level101.component.html',
  styleUrls: ['./level101.component.scss'],
})
export class Level101Component implements OnInit {
  // obs: any;

  constructor(
    private events: EventsService,
  ) { }

  ngOnInit() {
    // this.obs.subscribe(
    //   (val: any) => { console.log(val) }, //next callback
    //   (error: any) => { console.log("error") }, //error callback
    //   () => { console.log("Completed") } //complete callback
    // )
  }

  published() {
    let x = Math.random() * 10;
    this.events.publish('random', x)
    //   this.obs = new Observable(observer => {
    //     console.log('Observable starts');

    //     setTimeout(() => {
    //       observer.next('1');
    //     }, 1000);
    //     setTimeout(() => {
    //       observer.next('2');
    //     }, 2000);
    //     setTimeout(() => {
    //       observer.next('3');
    //     }, 3000);
    //     setTimeout(() => {
    //       observer.next('4');
    //     }, 4000);
    //     setTimeout(() => {
    //       observer.next('5');
    //     }, 5000);
    //   });
  }

}
