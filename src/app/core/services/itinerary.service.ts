import { Vehicle } from './../models/vehicle.model';
import { Itinerary } from './../models/itinerary.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItineraryService {

  sourceItinerary: string = "https://fumt-api.herokuapp.com/boosao/iti/";
  vehicle!: Vehicle;
  
  constructor(
    private http: HttpClient
  ) { }

  getItinerary(id: String): Observable<Itinerary[]>{
    return this.http.get<Itinerary[]>(this.sourceItinerary+id)
  }
  
  setSelectedVehicle(vehicle: Vehicle){
    this.vehicle = vehicle
  }

  getSelectedVehhicle(): Vehicle{
    return this.vehicle
  }

}
