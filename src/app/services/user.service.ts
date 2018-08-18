import { Injectable } from "@angular/core";
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from '../shared/models/user';

@Injectable()
export class UserService {
    constructor(private db: AngularFireDatabase){}

    pullUserData(uid){
       return this.db.list(`/users/${uid}`).valueChanges();
    }

    addUserData(res: any){
        return this.db.object(`/users/${res.user.uid}`).update({
            name: res.user.displayName,
            email: res.user.email,
            photo: res.user.photoURL
        });
    }
}