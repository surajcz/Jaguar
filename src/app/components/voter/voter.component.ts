import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      console.log('---ngoninit')
      if (this.resetCount) {
        console.log('---ngoninit----IF')
        this.didVote = false;
      }
    }, 1000);
  }

  vote(agreed: any) {
    let emitedData = { 'agreed': agreed, 'resetCount': this.resetCount }
    this.voted.emit(emitedData);
    this.didVote = true;
    this.resetCount = false;
  }

}
