import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Payment } from '../models/payment';
import { User } from '../models/user';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  transferForm: FormGroup;
  user: User = JSON.parse(localStorage.getItem('userDTO')!);
  connections: User[];
  payments: Payment[];
  amount: number;
  loading: boolean = true;

  constructor(private fb: FormBuilder,
    private router: Router,
    private backendService: BackendService) {
    this.backendService.getUserBankAccount(this.user.id)
      .subscribe((res) => {
        this.amount = res;
      })
    this.backendService.getUserConnections(this.user)
      .subscribe((res) => {
        this.connections = res;
      })
    this.backendService.getUserPayments(this.user)
      .subscribe((res) => {
        this.payments = res;
      });
    this.generateForm();
    this.loading = false;
  }

  ngOnInit(): void {
  }

  generateForm() {
    this.transferForm = this.fb.group({
      'connection': this.fb.control(''),
      'description': this.fb.control(''),
      'amount': this.fb.control('')
    }, { updateOn: 'submit' });
  }

  onSubmit() {
    this.loading = true;
    console.log(this.transferForm.value.connection);
    console.log(this.transferForm.value.description);
    console.log(this.transferForm.value.amount);

    this.backendService.sendMoney(this.user, this.transferForm.value.connection.id,
      this.transferForm.value.description, this.transferForm.value.amount)
      .subscribe(res => {
        if (res != null) {
          console.log(res);
          this.payments = res;
          this.backendService.getUserBankAccount(this.user.id)
            .subscribe((res) => {
              this.amount = res;
              this.loading = false;
            });
          this.generateForm();
        }
      });
  }

  selectConnection(conncetion: any) {
    this.transferForm.controls['connection'].setValue(conncetion);
  }

  displayFnConnection(connectionName: string) {
    return connectionName;
  }

  trackPaymentList() {
    return this.payments ? this.payments : undefined;
  }

  addConnection() {
    this.router.navigate(['/add/connection/', this.connections]);
  }

}
