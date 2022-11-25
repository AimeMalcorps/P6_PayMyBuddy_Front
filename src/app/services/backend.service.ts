import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  configUrl = 'http://localhost:4200/api';
  httpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) {

  }

  login(email: string, password: string) {
    return this.http.post<any>(this.configUrl + '/login', {email: email, password: password});
  }

  createAccount(name: string, email: string, password: string, phoneNumber: number) {
    return this.http.post<any>(this.configUrl + '/create/account', {name,email,password,phoneNumber});
  }

  getUserBankAccount(userId: number) {
    return this.http.get<any>(this.configUrl + '/user/bankAccount/' + userId);
  }

  getUserConnections(user: User) {
    return this.http.get<any>(this.configUrl + '/user/connections/' + user.name);
  }

  getUserPayments(user: User) {
    return this.http.get<any>(this.configUrl + '/user/payments/' + user.name);
  }

  sendMoney(user: User, connectionId: number, description: string, amount: number) {
    return this.http.post<any>(this.configUrl + '/send/money', {user: user, connectionId: connectionId, description: description, amount: amount});
  }

  addConnection(userId: number, connectionName: string) {
    return this.http.post<any>(this.configUrl + '/connection/add/' + userId, connectionName);
  }

}
