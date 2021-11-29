import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'boo-itinerary-card',
  templateUrl: './itinerary-card.component.html',
  styleUrls: ['./itinerary-card.component.scss']
})
export class ItineraryCardComponent implements OnInit {

  @Input() type: String = 'bus';
  @Input() code: String = '';
  @Input() name: String = '';

  constructor() { }

  ngOnInit(): void {
  }

}
