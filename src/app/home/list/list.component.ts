import { ItineraryService } from './../../core/services/itinerary.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';

import { Vehicle } from './../../core/models/vehicle.model';
import { VehicleService } from './../../core/services/vehicle.service';

@Component({
  selector: 'boo-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  sentence: String = '';
  _busVehicles: Vehicle[] = [];
  _vanVehicles: Vehicle[] = [];
  _sentenceVehicles: Vehicle[] = [];
  vehicles: Vehicle[] = [];
  vans: Vehicle[] = [];
  page: number = 1;
  loading: Boolean = false;
  busStatus: Boolean = true;
  vanStatus: Boolean = true;
  showSentence: Boolean = false;
  error: Boolean = false;
  filter: String = 'both';
  fumt:Boolean = false;
  statusBook:any = "";
  constructor(
    private vehicleService: VehicleService,
    private router: Router,
    private itineraryService: ItineraryService

  ) { }

  ngOnInit(): void {
    this.getAllVehicles()
    this.getStatusBook()
  }
  filterBus() {
    this.busStatus = !this.busStatus
    this.search(this.sentence)
  }
  getStatusBook(){
    this.vehicleService.getBookServicestatus().subscribe((res: any) => {
      this.statusBook = res
    })
  }

  
  filterVan() {
    this.vanStatus = !this.vanStatus
    this.search(this.sentence)
  }



  async search(sentence: String) {
    this.resetPage()
    this.resetVehicles()

    if (!this.busStatus && !this.vanStatus) {
      this.resetVehicles()
    }
    if (this.busStatus && !this.vanStatus) {
      this.vehicles = this._busVehicles
    }
    if (!this.busStatus && this.vanStatus) {
      this.vehicles = this._vanVehicles
    }
    if (this.busStatus && this.vanStatus) {
      this.vehicles = _.orderBy([...this._vanVehicles, ...this._busVehicles], ['nome'], ['asc'])
    }

    if (this.sentence.length > 0) {
      this.showSentence = true
      sentence = sentence.toLowerCase()
      this.vehicles = this.vehicles.filter((v: Vehicle) => {
        if ((v.nome?.toLowerCase().includes(sentence.toString()) || v.codigo?.toLowerCase().includes(sentence.toString()))) {
          console.log('--', sentence, v.nome, v.codigo)
        }
        return (v.nome?.toLowerCase().includes(sentence.toString()) || v.codigo?.toLowerCase().includes(sentence.toString()))
      })
    } else {
      this.showSentence = false
    }

  }
  getAllVehicles() {
    this.setLoading(true)
    this.error = false
    this.vehicleService.getBuses().subscribe((res: Vehicle[]) => {
      this._busVehicles = res
      this.vehicles = [...this.vehicles, ...this._busVehicles]
      this.vehicles = _.orderBy(this.vehicles, ['nome'], ['asc'])
      this.setLoading(false)
    }, err => {
      this.error = true
      this.setLoading(false)
    })
    this.vehicleService.getVans().subscribe((res: Vehicle[]) => {
      this._vanVehicles = res
      this.vehicles = this.orderVehicles([...this.vehicles, ...this._vanVehicles])
      this.setLoading(false)
    }, err => {
      this.error = true
      this.setLoading(false)
    })
  }

  setLoading(loading: Boolean){{
    this.loading = loading
  }}

  orderVehicles(vehiclesList: Vehicle[]){
    return _.orderBy(vehiclesList, ['nome'], ['asc'])
  }

  setValueToSearch(sentence: String) {
    this.sentence = sentence;
  }

  resetPage() {
    this.page = 1
  }
  resetVehicles() {
    this.vehicles = []
    this.vehicleService.resetVehicles()
  }


  hasList() {
    return this.vehicles && this.vehicles.length !== 0
  }
  centralizeClass() {
    if (!this.hasList()) {
      return 'd-flex flex-column without-list justify-content-center'
    }
    return ''
  }

  chooseCard(vehicle: Vehicle) {
    this.router.navigateByUrl(`/${vehicle.id}`);
  }

  setSelectedVehicle(vehicle: Vehicle) {
    this.itineraryService.setSelectedVehicle(vehicle)
  }

}
