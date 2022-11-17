import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../models/user';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-add-connection',
  templateUrl: './add-connection.component.html',
  styleUrls: ['./add-connection.component.css']
})
export class AddConnectionComponent implements OnInit {
  connectionForm: FormGroup;
  connections: User[] = [];
  user: User = JSON.parse(localStorage.getItem('userDTO')!);

  constructor(private backendService: BackendService,
    private fb: FormBuilder) {
    this.backendService.getUserConnections(this.user)
      .subscribe((res) => {
        this.connections = res;
      });
    this.generateForm();
  }

  ngOnInit(): void {

  }

  onSubmit() {
    console.log(this.user.id);
    this.backendService.addConnection(this.user.id, this.connectionForm.value.name)
      .subscribe(res => {
        if (res != null) {
          console.log(res);
          this.connections = res;
        }
      })
  }

  generateForm() {
    this.connectionForm = this.fb.group({
      'name': this.fb.control('')
    }, { updateOn: 'submit' });
  }

  trackConnections() {
    return this.connections ? this.connections : undefined;
  }

}
