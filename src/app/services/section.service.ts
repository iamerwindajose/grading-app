import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { Section } from '../shared/models/section';
import { Sections } from '../shared/models/sections';

@Injectable()

export class SectionService {
    sectionList: AngularFireList<any>;
    section: Section = new Section();
    
    constructor(private db: AngularFireDatabase){
        this.sectionList = this.db.list('sections');
    }

    findSection(key){
        return this.db.object(`/sections/${key}`);
    }

    addSection(uid, section: Section) {
        this.sectionList.push({
            sectionName: section.sectionName,
            sectionHolder: uid
        });
    }

    getStudentsLength(key){
        return this.db.list(`/students`, ref => ref.orderByChild('section').equalTo(key)).snapshotChanges();
    }
}