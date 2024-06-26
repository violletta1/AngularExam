import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { UsersModule } from 'src/app/users/users.module';
import { UsersService } from 'src/app/users/users.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  animations: [
    trigger('iconHover', [
      state('true', style({
        transform: 'translateY(-10px)'
      })),
      state('false', style({
        transform: 'none'
      })),
      transition('false => true', animate('0.5s')),
      transition('true => false', animate('0.5s'))
    ])
  ]
})
export class FooterComponent{
  
  user$ = this.userService.getCurrentUserData;
  iconStates: boolean[] = [false, false, false, false];

  constructor(private userService:UsersService) { }

  hoverIcon(state: boolean, index: number) {
    this.iconStates[index] = state;
  }
}