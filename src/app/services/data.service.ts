import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

// global headers
const options = {
  headers: new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(private http: HttpClient) {
  }

  // register
  register(acno: any, username: any, password: any) {
    // req body
    const data = {
      acno,
      username,
      password,
    }
    // register api - asynchronous
    return this.http.post('http://localhost:3000/register', data)
  }

  // Login
  login(acno: any, pswd: any) {
    // req body
    const data = {
      acno,
      pswd,
    }
    // register api - asynchronous
    return this.http.post('http://localhost:3000/login', data)
  }

  getOption() {
    //  feach the token from localstorage
    const token = JSON.parse(localStorage.getItem('token') || '')
    // to get header , create an object from HttpHeader
    let headers = new HttpHeaders()
    // append token inside header
    if (token) {
      headers = headers.append('x-access-token', token)
      // implement overloading
      options.headers = headers
    }
    return options
  }

  // deposit
  deposit(acno: any, pswd: any, amt: any) {
    // req body
    const data = {
      acno,
      pswd,
      amt
    }
    // deposit api - asynchronous
    return this.http.post('http://localhost:3000/deposit', data, this.getOption())
  }

  // withdraw
  withdraw(acno: any, pswd: any, amt: any) {
    // req body
    const data = {
      acno,
      pswd,
      amt
    }
    // withdraw api - asynchronous
    return this.http.post('http://localhost:3000/withdraw', data, this.getOption())
  }

  // transaction
  getTransaction(acno: any) {
    // req body
    const data = {
      acno,
    }
    // transaction api - asynchronous
    return this.http.post('http://localhost:3000/transaction', data, this.getOption())
  }

  // deleteApi
  delete(acno: any) {
    return this.http.delete('http://localhost:3000/onDelete/' + acno)
  }

}
