import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';

const TOKEN_KEY ='auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authticationState = new BehaviorSubject(false);

  constructor(private storage: Storage, private plt: Platform) {
    console.log(
      'foo'
    );
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  login(token) {
    return this.storage.set(TOKEN_KEY, `Bearer ${token}`).then(res => {
      console.log(res);
      
      this.authticationState.next(true);
    });
  }

  logout() {
    return this.storage.remove(TOKEN_KEY).then(res => {
      this.authticationState.next(false);
    });
  }

  isAuthenticated() {
    return this.authticationState.value;
  }

  checkToken() {
    return this.storage.get(TOKEN_KEY).then(res => {
      if(res) {
        this.authticationState.next(true);
      }
    });
  }

}
