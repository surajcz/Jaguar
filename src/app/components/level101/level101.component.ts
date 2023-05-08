import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-level101',
  templateUrl: './level101.component.html',
  styleUrls: ['./level101.component.scss'],
})
export class Level101Component implements OnInit {

  constructor(
    private events: EventsService,
  ) { }

  ngOnInit() { }

  published() {
    let x = Math.random() * 10;
    this.events.publish('random', x)
  }

}
