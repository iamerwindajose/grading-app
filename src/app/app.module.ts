import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes } from '@angular/router';

// Module imports
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './services/core-service.module';

// Firebase imports
import { AngularFireModule } from 'angularfire2';
import * as firebase from 'firebase';

// Component imports
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/login/login.component';

//Other imports
import { environment } from '../environments/environment';
import { AuthService } from './services/auth.service';
import { SinglesectionComponent } from './components/singlesection/singlesection.component';




@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    SinglesectionComponent
  ],
  imports: [
    CoreModule,
    FormsModule,
    CommonModule,        
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'grading-app'),
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
