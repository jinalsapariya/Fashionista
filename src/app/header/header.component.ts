import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../entities/user/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges {

  userLoggedIn: Boolean = false;
  user: IUser = null

  @Input() userToDisplay: IUser = null;

  constructor(private route: Router) { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    // throw new Error('Method not implemented.');
    if (this.userToDisplay !== null) {
      console.log("user object updated");
      this.userLoggedIn = true;
      this.user = this.userToDisplay;
    }
  }

  ngOnInit(): void {
    if (this.user != null) {
      console.log(this.user.name);
    }
  }

  logout() {
    this.userLoggedIn = false;
    this.user = null;
    this.route.navigate(['/']);
  }
  // attach() {
  //   $('#loading').show();
  // }
}
