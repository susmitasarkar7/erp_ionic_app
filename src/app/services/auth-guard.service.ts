import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http'

let apiUrl = "http://52.14.239.197/api/"

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private authService: AuthenticationService,
    private http: HttpClient
  ) { }

  canActivate(): boolean {
    return this.authService.isAuthenticated();
  };

  postData(credentials, type){
    console.log(credentials);
    
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders().set('content-Type', 'application/json');
      this.http.post(apiUrl+type, JSON.stringify(credentials), {headers: headers}).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
      
    });
  }

}
