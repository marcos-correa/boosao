import { ListComponent } from './list/list.component';
import { ItineraryComponent } from './itinerary/itinerary.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', component: ListComponent },
  { path: ':id', component: ItineraryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
