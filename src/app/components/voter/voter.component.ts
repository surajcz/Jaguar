import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-voter',
  templateUrl: './voter.component.html',
  styleUrls: ['./voter.component.scss'],
})
export class VoterComponent implements OnInit {
  @Input() name = '';
  @Input() resetCount = false;
  @Output() voted = new EventEmitter<any>();
  didVote = false;

  constructor(
    private events: EventsService
  ) { }

  ngOnInit() {
    this.events.subscribe('resetCount', (res) => {
      this.didVote = false;
    });
  }

  vote(agreed: any) {
    let emitedData = { 'agreed': agreed, 'resetCount': this.resetCount }
    this.voted.emit(emitedData);
    this.didVote = true;
    this.resetCount = false;
  }

}
