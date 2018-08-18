import { Component, OnInit, OnDestroy } from '@angular/core';
import { SectionService } from '../../services/section.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Sections } from '../../shared/models/sections';
import { Section } from '../../shared/models/section';
import { NgForm } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import 'rxjs/add/operator/take';
import { take } from 'rxjs/operators';
import { Subscriber } from 'rxjs/Subscriber';
import { Student } from '../../shared/models/student';

@Component({
  selector: 'app-singlesection',
  templateUrl: './singlesection.component.html',
  styleUrls: ['./singlesection.component.scss']
})
export class SinglesectionComponent implements OnInit {
  
  private key: string;
  private sectionKey: Observable<any>;
  private students: Observable<any>
  private section: Section;
  sec: any[];
  studentsArray: any[];
  studentForm: NgForm;
  $id: number;
  onedit: boolean = false;
  constructor(public sectionService: SectionService, private db: AngularFireDatabase,
     private route: ActivatedRoute, private studService: StudentService) {
        this.key = this.route.snapshot.params['id'];
        this.sectionKey = this.sectionService.findSection(this.key).valueChanges().take(1);
        this.students = this.studService.getStudents(this.key).snapshotChanges()
        .map(students => {
          return students.map(val => ({key: val.key, ...val.payload.val()}));
        });
        this.sec = [];
        this.sectionKey.subscribe(res => {
          this.sec.push(res);
        });
   }

  ngOnInit() {
    this.students
    .subscribe(items => {
      this.studentsArray = [];
      items.map(item => {
        this.studentsArray.push(item);
      })
    })
    
  }

  addStudent(studentForm: NgForm){
    if(studentForm.value.key){
      this.studService.updateStudent(this.key, studentForm.value);
    }
    else{
      this.studService.addStudent(this.key, studentForm.value);
    }
    studentForm.reset();
  }

  edit(stud: Student){
    this.studService.student = Object.assign({}, stud);
  }

  deleteStudent(key){
    this.studService.deleteStudent(key);
  }

  mathRound(i){
    return Math.round((i + 0.00001) * 100) / 100;
  }
}
