import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  localStorage: Storage;

  constructor() {
    this.localStorage = window.localStorage;
  }
  get(key: string): any {
    if (!this.isLocalStorageSupported) return null
    
    const storedObject = JSON.parse(this.localStorage.getItem(key) || "null");
    if (!storedObject) return null
    const hasExpired = Date.now() >= storedObject.timeToExpire;
    if(hasExpired) {
      this.remove(key)
      return null
    }
    delete storedObject.timeToExpire
    return storedObject.data
  }

  set(key: string, value: any, timeToPersist: number): boolean {
    const objectToStore: any = {
      data:value
    }
    objectToStore["timeToExpire"] = Date.now() + timeToPersist;
    if (this.isLocalStorageSupported) {
      this.localStorage.setItem(key, JSON.stringify(objectToStore));
      return true;
    }
    return false;
  }

  remove(key: string): boolean {
    if (this.isLocalStorageSupported) {
      this.localStorage.removeItem(key);
      return true;
    }
    return false;
  }

  clear(){
    if (this.isLocalStorageSupported) {
      this.localStorage.clear();
    }
  }
  get isLocalStorageSupported(): boolean {
    return !!this.localStorage
  }
}
