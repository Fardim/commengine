import { UserService } from './user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable, of } from 'rxjs';
import * as firebase from 'firebase/app';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private router: ActivatedRoute,private userService: UserService) {
    this.user$ = this.afAuth.authState;
  }

  login(){
    let returnUrl = this.router.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout(){
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<any>{
    return this.user$.pipe(switchMap(user => {
      if (user) {
        return this.userService.get(user.uid);
      }

      return of(null);
    }));
  }
}
