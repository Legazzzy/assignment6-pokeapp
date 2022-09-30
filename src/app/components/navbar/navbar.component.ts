import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

/** component responsible for handeling the navigation menu*/
export class NavbarComponent implements OnInit {
  /** Get user */
  get user(): User | undefined {
    return this.userService.user;
  }

  /** Handle logout request*/
  handleLogout ():void {
    /** Set user to undefined */
    this.userService.user = undefined;
  }

  /** Constructor, creates an instance of UserService and Router */
  constructor(
    private readonly userService: UserService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

}
