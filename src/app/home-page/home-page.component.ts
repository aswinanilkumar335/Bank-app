import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  acno = ""
  pswd = ""
  amount = ""

  acno1 = ""
  pswd1 = ""
  amount1 = ""

  // Login username
  user = ""

  // deposit model
  depositForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]*')]],
    amount: ['', [Validators.required, Validators.pattern('[0-9]*')]]
  })

  // withdraw model
  withdrawForm = this.fb.group({
    acno1: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd1: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]*')]],
    amount1: ['', [Validators.required, Validators.pattern('[0-9]*')]]
  })

  // date using pipe
  lDate: any

  constructor(private ds: DataService, private fb: FormBuilder, private router: Router) {
    if(localStorage.getItem('currentUsername')){
      // fetch username from localstorage
      this.user = JSON.parse(localStorage.getItem('currentUsername') || '')             
    }
    this.lDate = new Date()
  }

  ngOnInit(): void {
    if (!localStorage.getItem('token')) {
      alert('Please login')
      this.router.navigateByUrl('')
    }
  }

  deposit() {
    var acno = this.depositForm.value.acno
    var pswd = this.depositForm.value.pswd
    var amount = this.depositForm.value.amount
    // checking form valid
    if (this.depositForm.valid) {
      this.ds.deposit(acno, pswd, amount)
        .subscribe((result: any) => {
          alert(result.message)
        },
          result => {
            alert(result.error.message)
          })
    }
    else {
      alert('Invalid Form')
    }
  }

  withdraw() {
    var acno = this.withdrawForm.value.acno1
    var pswd = this.withdrawForm.value.pswd1
    var amount = this.withdrawForm.value.amount1
    // checking form valid
    if (this.withdrawForm.valid) {
      this.ds.withdraw(acno, pswd, amount)
        .subscribe((result: any) => {
          alert(result.message)
        },
          result => {
            alert(result.error.message)
          })
    }
    else {
      alert('Invalid Form')
    }
  }

  // log out
  logOut() {
    // remove login acno , username , token
    localStorage.removeItem('currentAcno')
    localStorage.removeItem('currentUsername')
    localStorage.removeItem('token')
    // navigate to login page
    this.router.navigateByUrl('')
  }

  // deleteParent()
  deleteParent() {
    this.acno = JSON.parse(localStorage.getItem('currentAcno') || '')
  }

  // cancel-to set acno as empty
  cancel() {
    this.acno = ""
  }

  // onDelete($event)
  onDelete(event: any) {
    // asynchronous
    this.ds.delete(event)
      .subscribe(
        (result: any) => {
          alert(result.message)
          this.logOut()
        },
        result => {
          alert(result.error.message)
        }
      )
  }

}
