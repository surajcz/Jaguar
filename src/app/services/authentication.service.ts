import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';

import { Storage } from '@capacitor/storage';
const TOKEN_KEY = 'fbase_key';


import {
  Auth,
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  signInWithPopup
} from '@angular/fire/auth';
import {
  Firestore,
  doc,
  onSnapshot,
  DocumentReference,
  docSnapshots,
  collection,
  setDoc,
  getDoc,
  addDoc,
  collectionData
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // Init with null to filter out the first value in a guard!
  isAuthenticated: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  token = '';

  constructor(
    private firestore: Firestore,
    private http: HttpClient,
    private auth: Auth
  ) {
    this.loadToken();
  }

  async loadToken() {
    const token = await Storage.get({ key: TOKEN_KEY });
    console.log('auth.service-----token', token)
    if (token && token.value) {
      console.log('set token: ', token.value);
      this.token = token.value;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }


  // getData(): Observable<any[]> {
  //   return collectionData<any>(collection(this.firestore, 'workout-list'), {
  //     idField: 'OH00Pni9j4VJMtuemo5U'
  //   });
  // }

  getData(collectionName: any): Observable<any[]> {
    const contactsCollection = collection(this.firestore, collectionName);
    // this method returns a stream of documents mapped to their payload and id
    return collectionData(contactsCollection, { idField: 'id' })
      .pipe(
        map(contacts => contacts as any[])
      );
  }




  async register(email: any, password: any) {
    try {
      const user = await createUserWithEmailAndPassword(this.auth, email, password);

      const document = doc(collection(this.firestore, 'users'));
      const userData = {
        uid: user.user.uid,
        email: user.user.email,
        displayName: user.user.displayName,
        emailVerified: user.user.emailVerified,
      };
      setDoc(document, userData);
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

  async googleAuth() {
    try {
      const provider = new GoogleAuthProvider();

      const auth = getAuth();
      let redirectUser = signInWithPopup(auth, provider)
        .then((result: any) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential?.accessToken;
          // The signed-in user info.
          const user = result.user;
          // IdP data available using getAdditionalUserInfo(result)
          // ...
          return user;
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });



      //   signInWithRedirect(auth, provider);

      //   let redirectUser = getRedirectResult(auth)
      //     .then((result: any) => {
      //       console.log('redirectUser-----result', result)
      //       // This gives you a Google Access Token. You can use it to access Google APIs.
      //       const credential = GoogleAuthProvider.credentialFromResult(result);
      //       const token = credential?.accessToken;

      //       // The signed-in user info.
      //       const user = result.user;
      //       // IdP data available using getAdditionalUserInfo(result)
      //       // ...
      //       console.log('redirectUser------user', user)
      //       return user;
      //     }).catch((error) => {
      //       // Handle Errors here.
      //       const errorCode = error.code;
      //       const errorMessage = error.message;
      //       // The email of the user's account used.
      //       const email = error.customData.email;
      //       // The AuthCredential type that was used.
      //       const credential = GoogleAuthProvider.credentialFromError(error);
      //       // ...
      //     })
      //   return redirectUser;
      return redirectUser;

    } catch (e) {
      return null;
    }
  }

  logout() {
    this.isAuthenticated.next(false);

    return signOut(this.auth);
  }

}