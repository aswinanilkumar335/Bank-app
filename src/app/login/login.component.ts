import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // properties / variables
  aim = 'Your perfect banking partner'     //string interpolation

  account = 'Please enter account number here'      //property binding

  // to hold the account number
  acno = ""

  // to hold the Password
  pswd = ""

  // Data base 
  userDetails: any = {
    1000: { acno: 1000, username: 'Neer', password: 1000, balance: 5000 },
    1001: { acno: 1001, username: 'Laisha', password: 1001, balance: 6000 },
    1002: { acno: 1002, username: 'Vyom', password: 1002, balance: 4000 }
  }

  // login model
  loginForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]*')]]
  })

  // constructors - Dependency injection (It initiates objects)
  constructor(private router: Router, private ds: DataService, private fb: FormBuilder) { }

  // life cycle hook - angular
  ngOnInit(): void {
  }

  //user defined functons are defined here

  // acnoChange
  acnoChange(event: any) {
    this.acno = event.target.value
    console.log(this.acno);
  }

  // pswdChange
  pswdChange(event: any) {
    this.pswd = event.target.value
    console.log(this.pswd);
  }

  // Login
  login() {
    var acno = this.loginForm.value.acno
    var pswd = this.loginForm.value.pswd
    // Checking Form Valid
    if (this.loginForm.valid) {
      // Calling Login - dataService - asynchronous
      this.ds.login(acno, pswd)
        .subscribe((result: any) => {
          // to store data in the localstorage
          localStorage.setItem('currentUsername',JSON.stringify(result.currentUsername))
          localStorage.setItem('currentAcno',JSON.stringify(result.currentAcno))
          localStorage.setItem('token',JSON.stringify(result.token))
          alert(result.message)
          this.router.navigateByUrl("homepage")
        },
          result => {
            alert(result.error.message)
          })
    }
    else {
      alert('Invalid Form')
    }
  }
}









  // Code uses when template referncing variable is used give arguments to the login function in html

  // login(a:any,p:any){
  //   var acno=a.value
  //   var pswd=p.value

  //   let userDetails=this.userDetails
  //   if(acno in userDetails){
  //     if(pswd==userDetails[acno]['password']){
  //       alert("Login Successfull")
  //     }
  //     else{
  //       alert("Incorrect password")
  //     }
  //   }
  //   else{
  //     alert("User doesnot exist")
  //   }
  // }

