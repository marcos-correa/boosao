import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// import { FormsModule } from '@angular/forms';

@Component({
  selector: 'boo-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Output() sentence: EventEmitter<String> = new EventEmitter<String>();
  @Output() search: EventEmitter<any> = new EventEmitter<any>();
  frase: String = '';
  constructor() { }

  ngOnInit(): void {
  }

  emitSentence(value: String) {
    this.sentence.emit(value);
  }
  emitSearch() {
    this.search.emit();
  }
  resetSearch() {
    this.frase = ''
    this.emitSentence(this.frase);
    this.emitSearch()
  }


}
