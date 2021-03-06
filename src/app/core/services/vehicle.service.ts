import { environment } from './../../../environments/environment.prod';
import { LocalStorageService } from './local-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';

import { Vehicle } from './../models/vehicle.model';
import * as _ from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  _path: string = "/api/php/facades/process.php";

  _sourceVan: string = "l";
  _sourceBus: string = "o";
  vehicles: Vehicle[] = [];
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    
    ) {

    }
    
    headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    })

    

  getBuses(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>("https://fumt-api.herokuapp.com/boosao/bus").pipe(map((buses: Vehicle[]) => {
      buses.forEach((bus: Vehicle) => {
        bus.type = "bus"
      });
      return buses;
      
    }
    ))
  }

  getBookServicestatus(): Observable<any>{
    let bookapi = "https://publishing-house-service.herokuapp.com/";
    return this.http.get<any>(bookapi).pipe(map(res =>{
      return res.message
    }))
  }
  getVans(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>("https://fumt-api.herokuapp.com/boosao/van").pipe(map((vans: Vehicle[]) => {
      vans.forEach((van: Vehicle) => {
        van.type = "van"
      });
      return vans;
    }))
  }

  async orderedVehicles(vehiclesArray: Vehicle[]): Promise<Vehicle[]> {
    return _.orderBy(vehiclesArray, ['nome'], ['asc'])
  }

  
  resetVehicles(){
    this.vehicles = []
  }

}


