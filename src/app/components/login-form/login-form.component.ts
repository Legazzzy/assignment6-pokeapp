import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StorageKeys } from 'src/app/enums/storage-keys.enum';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { StorageUtil } from 'src/app/utils/storage.util';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  @Output() login: EventEmitter<void> = new EventEmitter();

  constructor(
    private readonly loginService: LoginService,
    private readonly userService: UserService
    ) { }

  ngOnInit(): void {
    if (StorageUtil.storageRead(StorageKeys.User)) {
      this.login.emit();
    }
  }

  public loginSubmit(loginForm: NgForm): void {

    const { username } = loginForm.value;

    this.loginService.login(username)
    .subscribe({
      next: (user: User) => {
        this.userService.user = user;
        this.login.emit();
      },
      error: () => {

      }
    })
  }

}
