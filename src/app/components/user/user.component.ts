import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AppRoutes } from '../../shared/models/enums';
import { User } from '../../shared/models/user';
import { NgForm } from '@angular/forms';
import { SectionService } from '../../services/section.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Section } from '../../shared/models/section';
import { Observable } from 'rxjs/Observable';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [AuthService, SectionService, StudentService]
})
export class UserComponent implements OnInit {
  name: string;
  photo: string;
  uid: string;
  sectionForm: NgForm;
  sections: any[];
  createSuccess: boolean = false;
  students: any[];
    constructor(private auth: AuthService, private router: Router, private sectionService: SectionService,
       private db: AngularFireDatabase, private studService: StudentService) {

        this.auth.getUserInfo().subscribe(res => {
          this.name = res.displayName;
          this.photo = res.photoURL;
          this.uid = res.uid;
        });


     }
    
  ngOnInit() {
    this.getSections(this.uid).snapshotChanges()
      .map(sections => {
        return sections.map(section => ({key: section.key, ...section.payload.val()}));
      })
      .subscribe(items => {
        this.sections = [];
        items.map(item => {
          this.sections.push(item);
        });
        
        this.sections.forEach(c => {
        let a = this.sectionService.getStudentsLength(c.key).forEach(item => {
            c.studentCount = item.length
            c.students = item.map(s => ({ ...s.payload.val() }));
          })
        });
      }); 
  }

  getSections(uid){
    return this.db.list('/sections', ref => ref.orderByChild('sectionHolder').equalTo(uid));
  }

  createSection(sectionForm: NgForm){
    this.sectionService.addSection(this.uid, sectionForm.value);
    this.createSuccess = true;
    sectionForm.reset();
  }

  logout(){
    this.auth.signout()
    .then(res =>{
      this.router.navigate([AppRoutes.Default]);
    })
    .catch(err => console.log(err));
  }

}
