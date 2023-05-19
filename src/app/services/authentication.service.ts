import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';

import { Storage } from '@capacitor/storage';
const TOKEN_KEY = 'my-token';


import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // Init with null to filter out the first value in a guard!
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  token = '';

  constructor(
    private http: HttpClient,
    private auth: Auth
  ) {
    // this.loadToken();
  }

  // async loadToken() {
  //   const token = await Storage.get({ key: TOKEN_KEY });
  //   if (token && token.value) {
  //     console.log('set token: ', token.value);
  //     this.token = token.value;
  //     this.isAuthenticated.next(true);
  //   } else {
  //     this.isAuthenticated.next(false);
  //   }
  // }

  // login(credentials: { email: any; password: any }): Observable<any> {
  //   return this.http.post(`https://reqres.in/api/login`, credentials).pipe(
  //     map((data: any) => data.token),
  //     switchMap((token) => {
  //       return from(Storage.set({ key: TOKEN_KEY, value: token }));
  //     }),
  //     tap((_) => {
  //       this.isAuthenticated.next(true);
  //     })
  //   );
  // }

  // logout(): Promise<void> {
  //   this.isAuthenticated.next(false);
  //   return Storage.remove({ key: TOKEN_KEY });
  // }



  async register(email: any, password: any) {
    try {
      const user = await createUserWithEmailAndPassword(this.auth, email, password);
      return user;
    } catch (e) {
      return null;
    }
  }

  async login(email: any, password: any) {
    try {
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      return user;
    } catch (e) {
      return null;
    }

  }

  logout() {
    return signOut(this.auth);
  }

}