import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

  constructor(private employeeService: EmployeeService, private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm){
    if(form != null)
      form.reset();
    this.employeeService.selectedEmployee = {
      _id: "",
      name: "",
      position: "",
      office: "",
      salary: null
    }     
  }

  onSubmit(form: NgForm){
    if(form.value._id == ""){
      this.employeeService.postEmployee(form.value)
      .subscribe((res) => {
        this.resetForm(form);
        this.employeeService.getEmployee();
        this.toastr.success("Saved Successfully", 'Submited');
      });
    }else{
      this.employeeService.putEmployee(form.value)
      .subscribe((res) => {
        this.resetForm(form);
        this.employeeService.getEmployee();
        this.toastr.success("Updated Successfully", 'Submited');
      });
    }
  } 
}
