import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

const { apiUsers, apiKey } = environment;

@Injectable({
  providedIn: 'root'
})

/** Service responsible for handling the Login, and different actions associated with it. */
export class LoginService {

  /** Constructor, creates an instance of HttpClient */
  constructor(private readonly http: HttpClient) { }

  /**
   * Method used to handle a user login request. Tries to fetch the given user from API.
   * If no user with given username exists, create a new user and return it.
   * @param username : (String) Username of the user we want retrive
   * @returns A User object that contains the given username
   */
  public login(username: string): Observable<User> {
    return this.checkUsername(username)
    .pipe(
      switchMap((user: User | undefined) => {
        if (user === undefined) {
          return this.createUser(username)
        }
        return of(user);
      })
    )
  }

  /**
   * Method used to check if a user with a given username exists in the API database.
   * @param username : (String) Username of the user we want retrive
   * @returns A User object that contains the given username
   */
  private checkUsername(username: string): Observable<User | undefined> {
    return this.http.get<User[]>(`${apiUsers}?username=${username}`)
    .pipe(
      map((response: User[]) => response.pop())
    )
  }

  /**
   * Method used to create and add a new User to the API database.
   * @param username : (String) Username of the user we want to create
   * @returns The newly created User object
   */
  private createUser(username: string): Observable<User> {
    const user = {
      username,
      pokemon: []
    }

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "x-api-key": apiKey
    })

    return this.http.post<User>(apiUsers, user, { headers } ) 
  }
}
