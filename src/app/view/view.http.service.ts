import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ViewHttpService {

  constructor(
      private http: HttpClient,
  ) { }

  getView(menu) {
      return this.http.get(`/api/views/${menu}`);
  }

}
