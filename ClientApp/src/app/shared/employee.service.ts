import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Employee } from './employee.model'

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  readonly baseURL = "http://localhost:3000/employees";
  selectedEmployee: Employee;
  employees: Employee[];

  constructor(private _http: HttpClient) { }

  postEmployee(emp: Employee){
    return this._http.post(this.baseURL, emp);
  }

  getEmployee(){
    return this._http.get(this.baseURL)
      .toPromise()
      .then(res => {
        this.employees = res as Employee[]
      });
  }

  putEmployee(emp: Employee){
    return this._http.put(this.baseURL + `/${emp._id}`, emp);
  }

  deleteEmployee(_id: string){
    return this._http.delete(this.baseURL + `/${_id}`);
  }  
}
