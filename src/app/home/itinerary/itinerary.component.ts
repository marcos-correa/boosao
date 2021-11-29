import { Itinerary } from './../../core/models/itinerary.model';
import { Vehicle } from './../../core/models/vehicle.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { ItineraryService } from './../../core/services/itinerary.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'boo-itinerary',
  templateUrl: './itinerary.component.html',
  styleUrls: ['./itinerary.component.scss']
})
export class ItineraryComponent implements OnInit {

  id: string = '';
  vehicle: Vehicle = {};
  _itinerary: Itinerary[] = [];
  itinerary: Itinerary[] = [];
  error: Boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itineraryService:ItineraryService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.vehicle = this.itineraryService.getSelectedVehhicle()
    if(!this.vehicle){
      this.router.navigateByUrl("/buscar")
    }
    this.itineraryService.getItinerary(this.id).subscribe((res:Itinerary[]) =>{
      this.itinerary = Object.values(res)
    }, err => {
      this.router.navigateByUrl("/buscar")
    })
  }

  redirectMaps(lat:String,lng:String){
    let url = `https://www.google.com/maps/?q=${lat},${lng}`
    window.open(
      url,
      '_blank'
    );
  }

  getType(){
    return this.vehicle?.type ? this.vehicle.type : ''
  }

}
