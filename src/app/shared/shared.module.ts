import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CardComponent } from './components/card/card.component';
import { SearchComponent } from './components/search/search.component';
import { SharedRoutingModule } from './shared-routing.module';
import { ItineraryCardComponent } from './components/itinerary-card/itinerary-card.component';



@NgModule({
  declarations: [
    SearchComponent,
    CardComponent,
    ItineraryCardComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule
  ],
  exports:[
    SearchComponent,
    CardComponent,
    ItineraryCardComponent
  ]
})
export class SharedModule { }
