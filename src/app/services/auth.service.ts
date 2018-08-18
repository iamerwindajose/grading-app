import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { UserInfo, auth } from 'firebase/app';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { AppRoutes } from '../shared/models/enums';


@Injectable()
export class AuthService {
  
  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  isAuthenticated(): Observable<boolean>{
    return this.afAuth.authState
    .map(user => {
      if(user){
        return true;
      }
      else{
        this.router.navigate([AppRoutes.Login]);
        return false;
      }
    });
  }

  getUserInfo(): Observable<UserInfo>{
    return this.afAuth.authState
    .map(user => user? <UserInfo>user : null)
    .catch(err => {
      console.log(err);
      return Observable.throw(err);
    });
  }

  signinGoogle(){
    return this.afAuth.auth.signInWithPopup( new auth.GoogleAuthProvider() );
  }

  signout(){
    return this.afAuth.auth.signOut();
  }

}
