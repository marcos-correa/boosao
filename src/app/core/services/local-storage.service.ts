import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private storage: Storage;
  constructor(
  ) {
    this.storage = window.localStorage
   }

  set(key: string, value: any) {
    if (this.storage) { 
      this.storage.setItem(key, JSON.stringify(value));
      return true
    }
    return false;
  }

  get_before(key: string): any {
    if (this.storage) {
      return this.storage.getItem(key);
    }
    return null;
  }
  get(key:string):any{
    let storaged = this.get_before(key)
    if(storaged !== null){
      JSON.parse(storaged)
    }
  }

  remove(key: string): boolean {
    if (this.storage) {
      this.storage.removeItem(key);
      return true;
    }
    return false;
  }

  clear(): boolean {
    if (this.storage) {
      this.storage.clear();
      return true;
    }
    return false;
  }
  
}
