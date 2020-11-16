import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../entities/user/user.model';
import { HeaderComponent } from '../header/header.component';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: '';
  password: '';

  @Output() createdUser = new EventEmitter<IUser>();
  
  constructor(private userService : UserService,  private route : Router) { }

  onSubmit() {
    this.userService.loginUser(this.email, this.password).then((result: IUser) => {
      if (result) {
        console.log("login successful");
        // console.log(result);
        this.createdUser.emit(result);
        // localStorage.setItem('loggedInUser', JSON.stringify(result));
        // localStorage.setItem('loggedIn', 'true');
        // window.location.reload();
        this.route.navigate(['/']);
      } else {
        console.log("login unsuccessful");
      }
    });
  }

  ngOnInit(): void {
  }

}
