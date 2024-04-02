import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/users/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit  {
  user$ = this.userService.getCurrentUserData

  constructor(private userService:UsersService){}

  ngOnInit():void {
  
 }
}
