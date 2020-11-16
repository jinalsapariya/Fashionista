import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IUser, User } from '../entities/user/user.model';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  email: '';
  name: '';
  password: '';
  repass: '';
  emailValid: Boolean = false;
  // nameFlag: Boolean = false;
  // emailFlag: Boolean = false;
  // passFlag: Boolean = false;
  // repassFlag: Boolean = false;
  error: boolean = false;



  @Output() createdUser = new EventEmitter<IUser>();

  constructor(protected userService: UserService, private route: Router) { }

  // validateEmail(): void {
  //   let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   // var emailInput = document.getElementById('inputEmail');
  //   if (re.test(this.email.toLowerCase())) {
  //     // console.log(emailInput)
  //     // emailInput.style.borderColor = "green";
  //     // emailInput.style.border = "10rem";
  //     this.emailValid = true;

  //   } else {
  //     $("#inputEmail").addClass('wrongInput')
  //     console.log("wrong")
  //     // console.log(emailInput)
  //     // emailInput.style.borderColor = "red";
  //     // emailInput.style.border = "10rem";

  //   }
  //   console.log(this.email);
  // }



  /************validate*****/
  // validateInputs() {
  //   if (this.name === '' || this.name.length < 5) {
  //     $('#name').addClass('danger');
  //     this.nameFlag = false;
  //   } else {
  //     $('#name').removeClass('danger');
  //     this.nameFlag = true;
  //   }

  //   if (this.email === '' || !this.validateEmail(this.email)) {
  //     $('#email').addClass('danger');
  //     this.emailFlag = false;
  //   } else {
  //     $('#email').removeClass('danger');
  //     this.emailFlag = true;
  //   }

  //   if (this.password === '' || this.password.length < 5) {
  //     $('#pass').addClass('danger');
  //     this.passFlag = false;
  //   } else {
  //     $('#pass').removeClass('danger');
  //     this.passFlag = true;
  //   }

  //   if (this.repass === '' || this.repass.length < 5) {
  //     $('#re-pass').addClass('danger');
  //     this.repassFlag = false;
  //   } else {
  //     $('#re-pass').removeClass('danger');
  //     this.repassFlag = true;
  //   }

  // }
  // /**************end ***********/

  // validateEmail(email) {
  //   let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   return re.test(email.toLowerCase());
  // }

  onSubmit() {
    var user = new User('user', name, this.email, this.password, null);
    this.userService.createUser(user).then((result: IUser) => {
      if (result === undefined) {
        this.error = true;
      } else {
        this.error = false;
        this.route.navigate(['/'])
        this.createdUser.emit(result);
      }
    });
  }

  ngOnInit(): void {
  }

}
