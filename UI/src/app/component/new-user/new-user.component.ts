import { Component, OnInit } from '@angular/core';
import { Column, User } from '../../bo/model';
import { ApiService } from '../../service/api.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent implements OnInit {
  newUser: any = new User();
  loading: boolean = false;
  cols: Column[] = [];
  constructor(public api: ApiService, private message: MessageService,) { }
  ngOnInit(): void {
    this.createCols();
    this.newUser = new User();

  }
  createCols() {
    this.cols = [
      { field: 'firstname', header: 'Firstname', type: 'string' },
      { field: 'lastname', header: 'Lastname', type: 'string' },
      { field: 'age', header: 'Age', type: 'number' },
      { field: 'role', header: 'Role', type: 'dropdown' },
      { field: 'department', header: 'Department', type: 'dropdown' },
      { field: 'email', header: 'Email', type: 'string' },
      { field: 'phone', header: 'PhoneNo', type: 'number' }
    ]
  }
  createUser() {
    if (this.api.validateUser(this.newUser)) {
      this.loading = true;
      this.api.post(this.newUser, 'createUser').subscribe({
        next: (res: any) => {
          if (res.message) {
            this.message.add({ severity: 'error', summary: 'Failed', detail: res.message });
          } else {
            this.message.add({ severity: 'success', summary: 'Success', detail: 'User added' });
            this.newUser = new User();
          }
          this.loading = false;

        },
        error: (err: any) => {
          this.message.add({ severity: 'error', summary: 'Failed', detail: err?.error?.message ? err?.error?.message : err });
          this.loading = false;
        }
      })
    }

  }
}
