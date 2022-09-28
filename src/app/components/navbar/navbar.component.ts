import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { StorageKeys } from 'src/app/enums/storage-keys.enum';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { StorageUtil } from 'src/app/utils/storage.util';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  get user(): User | undefined {
    return this.userService.user;
  }

  handleLogout ():void {
    this.userService.user = undefined;
  }

  constructor(
    private readonly userService: UserService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

}
