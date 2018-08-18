import { Injectable } from "@angular/core";
import { Student } from '../shared/models/student';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';

@Injectable()

export class StudentService {
    studentList: AngularFireList<any>;
    public student: Student = new Student();
    constructor(private db: AngularFireDatabase){
        this.studentList = this.db.list('/students');
     }

     getStudents(key){
         return this.db.list('/students', ref => ref.orderByChild('section').equalTo(key));
     }

     addStudent(section, student: Student){
        student.average = (student.prelim + student.midterm + student.final)/3;
        console.log(student.average);
        this.db.list(`/students`).push({
            firstname: student.firstname,
            middlename: student.middlename,
            lastname: student.lastname,
            age: student.age,
            gender: student.gender,
            prelim: student.prelim,
            midterm: student.midterm,
            final: student.final,
            section: section,
            average: student.average
        })
     }

     updateStudent(section, student: Student){
        student.average = (student.prelim + student.midterm + student.final)/3;
        this.studentList.update(student.key, {
            firstname: student.firstname,
            middlename: student.middlename,
            lastname: student.lastname,
            age: student.age,
            gender: student.gender,
            prelim: student.prelim,
            midterm: student.midterm,
            final: student.final,
            section: section,
            average: student.average
        });
     }

     deleteStudent($id){
         this.studentList.remove($id);
     }
}