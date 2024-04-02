import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, UserInfo } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
import {  concatMap, from, map, Observable, of, switchMap} from 'rxjs';
import { ProfileUser } from '../types/user-profile';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  currentUser$ = authState(this.auth);
  
  constructor(private auth:Auth,private firestore:Firestore) { }
  
  login(emailUser:string,password:string){
    return from(signInWithEmailAndPassword(this.auth,emailUser,password));
  }
  logOut(){
    return from(this.auth.signOut())
  }
  register(email:string,password:string){
    return from(createUserWithEmailAndPassword(this.auth,email,password))

  }
  updateProfileData(profileData: Partial<UserInfo>): Observable<any>{
    const user = this.auth.currentUser
    return of(user).pipe(
      concatMap(user =>{
        if(!user) throw new Error(`Not authenticated`)
        return updateProfile(user,profileData)

      })
    )
  }
  addUser(user: ProfileUser): Observable<any> {
    const ref = doc(this.firestore, 'users', user.uid); // Assuming displayName is the username
    return from(setDoc(ref, user));
  }
  updateUser(user:ProfileUser):Observable<any>{
    const ref = doc(this.firestore,'users', user.uid)
    return from(updateDoc(ref, {...user}));
  }
  // getCurrentUserId(): Observable<string | null> {
  //   return this.currentUser$.pipe(
  //     map(user => user?.uid || null)
  //   );
  // }
 get getCurrentUserData():Observable<ProfileUser | null>{
  return this.currentUser$.pipe(
    switchMap((user) => {
      if(!user?.uid){
        return of(null);
      }
      const ref = doc(this.firestore,'users',user?.uid);
      return docData(ref) as Observable<ProfileUser>;
    })
  )
}

getCurrentUserUid(): Observable<string | null> {
  return this.currentUser$.pipe(
    map(user => user ? user.uid : null)
  );
}

}