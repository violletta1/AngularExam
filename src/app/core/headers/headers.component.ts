import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/users/users.service';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css']
})
export class HeadersComponent {
  user$ = this.userService.getCurrentUserData
  constructor(public userService:UsersService,private router:Router){}
  isLoggedIn: boolean = false;

  OnLogout(){
    this.userService.logOut().subscribe(()=>{
      this.router.navigate(['/home']);
    })
  }
}
