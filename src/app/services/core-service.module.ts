import { NgModule } from "@angular/core";
import { AuthService } from "./auth.service";
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { UserService } from "./user.service";
import { SectionService } from './section.service';
import { StudentService } from "./student.service";

@NgModule({
    imports: [
        AngularFireAuthModule,
        AngularFireDatabaseModule
    ],
    providers: [AuthService, UserService, SectionService, StudentService]
})

export class CoreModule { }