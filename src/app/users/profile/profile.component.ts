import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { User, UserInfo, UserProfile } from '@angular/fire/auth';
import { AppService } from 'src/app/app.service';
import {  HotToastService } from '@ngneat/hot-toast';
import { concatMap, map, Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { ProfileUser } from 'src/app/types/user-profile';
import { UntilDestroy,untilDestroyed } from '@ngneat/until-destroy';
import { Router } from '@angular/router';

// import { untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
  
})
export class ProfileComponent implements OnInit {
  user$ = this.userService.getCurrentUserData
  constructor(private userService: UsersService,private appService:AppService,private hotToast:HotToastService,private router:Router){}

  ngOnInit(): void {
    this.userService.getCurrentUserData.pipe(
      untilDestroyed(this)
    ).subscribe((user) => {
        this.profileForm.patchValue({ ...user });
      
    });
  }
  profileForm = new FormGroup({
      uid: new FormControl(''), // Initialize with default value if needed
      email: new FormControl(''),
      displayName: new FormControl(''),
      photoURL: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      phoneNumber: new FormControl(''),
      address: new FormControl(''),
      // products: new FormControl([null]), // Assuming products is an array
      // orders: new FormControl([null])
  });

  saveProfile() {
    const profileData: ProfileUser = this.profileForm.value as ProfileUser;

    this.userService.updateUser(profileData).subscribe({
      next: () => {
        this.hotToast.success('Profile updated successfully');
      },
      error: (err) => {
        this.hotToast.error('Failed to update profile: ' + err.message);
      }
    });
  }
  

  uploadImage(event:any,user:ProfileUser){
    this.appService.uploadImage(event.target.files[0],`images/profile/${user.email}`).pipe(
      this.hotToast.observe(
        {
          loading: 'Image is being uploaded...',
          success: 'Image uploaded successfully!',
          error: 'There was an error in uploading'
        }
      ),concatMap((photoURL)=> this.userService.updateUser({uid: user.uid,photoURL}))
    ).subscribe()
  }
  

}
