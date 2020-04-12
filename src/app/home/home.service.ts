import { Injectable } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private apiService: ApiServiceService) { }

  getDetails(): Observable<any> {
    const url = 'auth/getDetails';
    return this.apiService.get(url);
  }

  acceptRequest(data: any): Observable<any> {
    return this.apiService.post('auth/acceptRequest', data);
  }

}
