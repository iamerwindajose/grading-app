import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AppRoutes } from '../../shared/models/enums';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs/Observable';
import { map, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  displayError: any;
  constructor(private authService: AuthService, private router: Router, private user: UserService) { }

  ngOnInit() {
    this.authService.isAuthenticated().subscribe(res => {
      if(res){
        console.log('OnInit: ', res);
        this.router.navigate([`/${AppRoutes.Main}`]);
      }
    })
  }

  signin(){
    this.authService.signinGoogle()
    .then(res => {
      if(res.additionalUserInfo.isNewUser){
        console.log('Auth service: ', res);
        this.user.addUserData(res);
        this.router.navigate([AppRoutes.Main]);
      }
      else{
        this.router.navigate([AppRoutes.Main]);       
      }
      
    })
    .catch(err => {
      console.log(err);
      this.displayError = err;
    });
  }

}
