import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, RequestOptions } from '@angular/http';

import { IUser, User } from '../entities/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = '/api/user';

  constructor(private http: Http) { }

  // createNewUser(requestParam) {

  //   if (requestParam) {
  //     let headers = new Headers({});
  //     let options = new RequestOptions({ headers: headers });

  //     let body = new URLSearchParams();
  //     body.set('name', requestParam.name);
  //     body.set('password', requestParam.password);
  //     body.set('email', requestParam.email);
  //     body.set('user_token', requestParam.user_token);

  //     return this.http.post('/createUser', body, options).map(data => data.json()).catch(this.catch);
  //   }
  // }

  createUser(user: User): Promise<IUser> {
    return this.http.post(this.userUrl, user)
      .toPromise()
      .then(response => response.json())
      .catch(this.error);
  }

  loginUser(email: string, password: string) {
    //'/getUserByEmail?email='+email
    return this.http.get('/api/loginUser?email=' + email + '&password=' + password)
      .toPromise()
      .then(response => response.json())
      .catch(this.error);
  }

  // Error handling
  private error(error: any) {
    let message = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(message);
  }
}
