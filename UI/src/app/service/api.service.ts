import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../bo/model';
import { map } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private message: MessageService) { }
  api: string = "http://localhost:3000/api/";
  roleOptions: string[] = ['SuperAdmin', 'Admin', 'Employee'];
  depOptions: string[] = ['IT', 'HR', 'Admin'];
  phoneReg = /\+?\d[\d -]{8,12}\d/;
  emailReg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

  post(payload: User, endpoint: string) {
    return this.http.post(this.api + endpoint, payload).pipe(map(x => x));
  }

  get(endpoint: string) {
    return this.http.get(this.api + endpoint).pipe(map(x => x));
  }

  patch(payload: User, endpoint: string) {
    return this.http.patch(this.api + endpoint, payload).pipe(map(x => x));
  }

  delete(endpoint: string) {
    return this.http.delete(this.api + endpoint).pipe(map(x => x));
  }
  validateUser(user: User) {
    if (!user.firstname) {
      this.message.add({ severity: 'error', summary: 'Validation failed', detail: 'Firstname required' });
      return false;
    }
    if (!user.lastname) {
      this.message.add({ severity: 'error', summary: 'Validation failed', detail: 'Lastname required' });
      return false;
    }
    if (!user.role) {
      this.message.add({ severity: 'error', summary: 'Validation failed', detail: 'Role required' });
      return false;
    }
    if (!user.department) {
      this.message.add({ severity: 'error', summary: 'Validation failed', detail: 'Department required' });
      return false;
    }
    if (!user.age) {
      this.message.add({ severity: 'error', summary: 'Validation failed', detail: 'Age required' });
      return false;
    }
    if (!user.email) {
      this.message.add({ severity: 'error', summary: 'Validation failed', detail: 'Email required' });
      return false;
    }
    if (!this.emailReg.test(user.email)) {
      this.message.add({ severity: 'error', summary: 'Validation failed', detail: 'Entered email id is invalid.' });
      return false;
    }
    if (!user.phone) {
      this.message.add({ severity: 'error', summary: 'Validation failed', detail: 'PhoneNo required' });
      return false;
    }
    if (!this.phoneReg.test(user.phone.toString())) {
      this.message.add({ severity: 'error', summary: 'Validation failed', detail: 'Given phone no is invalid.' });
      return false;
    }
    return true;
  }
}
