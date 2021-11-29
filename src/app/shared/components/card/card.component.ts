import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'boo-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() type: String = 'bus';
  @Input() code: String = '';
  @Input() name: String = '';

  constructor() { }

  ngOnInit(): void {
  }

}
