import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})

/** Component responsible for handling the login form */
export class LoginFormComponent implements OnInit {

  @Output() login: EventEmitter<void> = new EventEmitter();

  /** Constructor, creates an instance of LofinService and UserService */
  constructor(
    private readonly loginService: LoginService,
    private readonly userService: UserService
    ) { }

  ngOnInit(): void {
    if (this.userService.user) {
      this.login.emit();
    }
  }

  /** Handle login button press */
  public loginSubmit(loginForm: NgForm): void {

    /** username value that user has put in 
     * @param username : value chosen by the user when logging in
    */
    const { username } = loginForm.value;

    /** uses login service with username to log in*/
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
