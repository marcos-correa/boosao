import { LocalStorageService } from './local-storage.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';

import { Vehicle } from './../models/vehicle.model';
import * as _ from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  source: String = "http://www.poatransporte.com.br/php/facades/process.php?a=nc&p=%25&t=";
  sourceVan: string = `${this.source}l`;
  sourceBus: string = `${this.source}o`;
  vehicles: Vehicle[] = [];
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,

  ) { }

  getBuses(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.sourceBus).pipe(map((buses: Vehicle[]) => {
      buses.forEach((bus: Vehicle) => {
        bus.type = "bus"
      });
      return buses;
      
    }
    ))
  }
  getVans(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.sourceVan).pipe(map((vans: Vehicle[]) => {
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


