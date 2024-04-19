import { Component, OnInit } from '@angular/core';
import { Column, User } from '../../bo/model';
import { ApiService } from '../../service/api.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(public api: ApiService, private message: MessageService, private confirm: ConfirmationService) { }
  users: User[] = [];
  loading: boolean = false;
  cols: Column[] = [];
  globalSearch: any;
  clonedProducts: { [s: string]: User } = {};
  ngOnInit(): void {
    this.users = [];
    this.createCols();
  }
  createCols() {
    this.cols = [
      { field: 'firstname', header: 'Firstname', type: 'string' },
      { field: 'lastname', header: 'Lastname', type: 'string' },
      { field: 'age', header: 'Age', type: 'number' },
      { field: 'role', header: 'Role', type: 'dropdown' },
      { field: 'department', header: 'Department', type: 'dropdown' },
      { field: 'email', header: 'Email', type: 'string' },
      { field: 'phone', header: 'PhoneNo', type: 'number' },
      { field: 'isactive', header: 'Status', type: 'bool' },]
    this.getUsers();
  }
  getUsers() {
    this.loading = true;
    this.api.get("getAllUsers").subscribe({
      next: (res: any) => {
        this.loading = false;
        if (res)
          this.users = res;
      },
      error: (err: any) => {
        this.loading = false;
        this.message.add({ severity: 'error', summary: 'Failed', detail: err.message ? err.message : err });
      }
    })
  }
  clear(table: Table) {
    table.clear();
    this.globalSearch = null;

  }
  updateUser(user: User) {
    this.confirm.confirm({
      key: 'update',
      header: 'Please confirm',
      message: 'Are you sure you want to update user details?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.loading = true;
        this.api.patch(user, 'updateUser/' + user._id).subscribe({
          next: (res: any) => {
            this.loading = false;
            if (res.message) {
              this.message.add({ severity: 'error', summary: 'Failed', detail: res.message });
            } else {
              this.message.add({ severity: 'success', summary: 'Success', detail: 'User details updated' });
            }
            this.refresh(null);
          },
          error: (err: any) => {
            this.loading = false;
            this.message.add({ severity: 'error', summary: 'Failed', detail: err.message ? err.message : err });
            this.refresh(null);
          }
        })
      }
    });
  }
  deleteUser(id: string, e: any) {
    this.confirm.confirm({
      target: e.target as EventTarget,
      message: 'Are you sure you want to delete user permanently?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.loading = true;
        this.api.delete('deleteUser/' + id).subscribe({
          next: (res: any) => {
            this.loading = false;
            this.message.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.refresh(null);
          },
          error: (err: any) => {
            this.loading = false;
            this.message.add({ severity: 'error', summary: 'Failed', detail: err.message ? err.message : err });
            this.refresh(null);
          }
        })
      }
    });
  }
  onRowEditInit(user: User) {
    this.clonedProducts[user._id as string] = { ...user };
  }
  onRowEditSave(user: User) {
    delete this.clonedProducts[user._id as string];
    if (this.api.validateUser(user))
      this.updateUser(user)
  }

  onRowEditCancel(user: User, index: number) {
    this.users[index] = this.clonedProducts[user._id as string];
    delete this.clonedProducts[user._id as string];
  }
  refresh(table: Table | null) {
    if (table)
      this.clear(table);
    this.clonedProducts = {};
    this.globalSearch = null;
    this.users = [];
    this.createCols();
  }
}
