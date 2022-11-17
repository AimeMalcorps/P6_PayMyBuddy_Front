import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  idError = false;
  loginView = true;
  signUpForm: FormGroup;

  constructor(private backendService: BackendService,
    private router: Router,
    private fb: FormBuilder) {
    this.generateLoginForm();
    this.generateSignUpForm();
  }

  generateLoginForm() {
    this.loginForm = this.fb.group({
      'email': this.fb.control('', Validators.required),
      'password': this.fb.control('', Validators.required)
    }, { updateOn: 'submit' });
  }

  generateSignUpForm() {
    this.signUpForm = this.fb.group({
      'name': this.fb.control('', Validators.required),
      'phone': this.fb.control('', Validators.required),
      'email': this.fb.control('', Validators.required),
      'password': this.fb.control('', Validators.required),
      'password2': this.fb.control('', Validators.required)
    }, { updateOn: 'submit' });
  }

  onSubmit() {
    this.idError = false;
    if (this.loginView) {
      this.backendService.login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe(res => {
          if (res != null) {
            localStorage.setItem('userDTO', JSON.stringify(res as User));
            this.router.navigate(['/home']);
          } else {
            this.idError = true;
            console.log(res);

          }
        });
    } else {
      console.log(this.signUpForm.value.name);
      this.backendService.createAccount(this.signUpForm.value.name, 
        this.signUpForm.value.email, this.signUpForm.value.password, this.signUpForm.value.phone)
        .subscribe(res => {
          if (res != null) {
            localStorage.setItem('userDTO', JSON.stringify(res as User));
            this.router.navigate(['/home']);
          } else {
            this.idError = true;
            console.log(res);

          }
        });
    }

  }

}
