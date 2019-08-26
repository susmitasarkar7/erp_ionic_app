import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { AuthGuardService } from '../services/auth-guard.service';
import { DashboardPage } from '../pages/dashboard/dashboard.page';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  showEmailForm = false;
  showPhoneForm = false;
  emailBtn  = true;
  phoneBtn  = true;

  responseData : any;
  userData = {
    "email": "",
    "phone_no": "",
    "password": ""
  }

  constructor(private navCtrl: NavController, 
    private authService: AuthenticationService,
    private augs : AuthGuardService
    ) { }

  ngOnInit() {
  }

  emailLogin() {
    this.clearData();
    this.showEmailForm = true;
    this.showPhoneForm = false;
    this.emailBtn = false;
    this.phoneBtn = true;
  }

  phoneLogin() {
    this.clearData();
    this.showPhoneForm = true;
    this.showEmailForm = false;
    this.phoneBtn = false;
    this.emailBtn = true;
  }

  clearData() {
    this.userData.email = '';
    this.userData.phone_no = '';
    this.userData.password = '';
  }

  login() {
    // this.authService.login();
    console.log(this.userData);
    
    if(this.showEmailForm) {
      this.augs.postData({
        "email": this.userData.email,
        "password": this.userData.password
      }, "login").then((res: any) => {
        if(res.code == '200') {
          this.authService.login(res.data.token);
        }
        
      }, (err)=> {
        // Connection failed
      });
    }
    
    if(this.showPhoneForm) {
      this.augs.postData({
        "phone_no": this.userData.phone_no,
        "password": this.userData.password
      }, "login").then((res: any) => {
        this.authService.login(res.data.token);
        
      }, (err)=> {
        // Connection failed
      });
    }
  }

}
