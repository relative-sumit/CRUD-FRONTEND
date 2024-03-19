import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  constructor(
    private fb: FormBuilder, 
    private http: HttpClient, 
    private datePipe: DatePipe,
    private empService: EmployeeService) { }

  empData: any;
  _id: any;
  ngOnInit(): void {
    this.empService.empData.subscribe((data) => {
      if (data) {
        this.empData = this.transformDates(data);
        this.updateForm.patchValue(this.empData[0]);
        console.log(this.empData[0].employee.managerDetails.employeeId);
        if(this.empData[0] && this.empData[0].employeeId){
          this._id = this.empData[0].employeeId;
          // console.log(this.empData[0].employeeId);
        }else{
          console.error("hello");
        }
      }
    });
  }

  transformDates(employeeData:any){
    const transformDate = {...employeeData}
    transformDate[0].personal.dob = this.datePipe.transform(transformDate[0].personal.dob, 'yyyy-MM-dd');
    transformDate[0].personal.doj = this.datePipe.transform(transformDate[0].personal.doj, 'yyyy-MM-dd');
    transformDate[0].personal.doc = this.datePipe.transform(transformDate[0].personal.doc, 'yyyy-MM-dd');
    return transformDate;
  }

  updateForm = this.fb.group({
    profile: this.fb.group({
      firstName: [''],
      middleName: [''],
      lastName: [''],
      contact: this.fb.group({
        phone: this.fb.group({
          countryCode: [''],
          primary: [''],
          backup: [''],
          emergency: [''],
        }),
        email: this.fb.group({
          companyMail: [''],
          personalMail: [''],
        }),
        location: this.fb.group({
          flat: [''],
          area: [''],
          landmark: [''],
          pincode: [''],
          city: [''],
          state: [''],
        }),
      }),
    }),
    personal: this.fb.group({
      dob: [''],
      doj: [''],
      doc: [''],
    }),
    employee: this.fb.group({
      department: [''],
      designation: [''],
      managerDetails: this.fb.control({
        employeeId: ['']
      }),
    }),
    asset: this.fb.group({
      assetId: [''],
      assetName: [''],
      assetModel: [''],
      assetType: [''],
    }),
    role: [''],
  });


  updateData() {
    const Id = {
      header: new HttpHeaders({
        'empId': this._id
      })
    }

    this.http.get('http://localhost:3000/employee/getOne')
    .subscribe

    
    this.http.put("http://localhost:3000/employee/update", this.updateForm.value, {headers: Id.header})
    .subscribe(
      response =>{
        console.log(response);
      }, error =>{
        console.error(error);
      }
    )
  }
}
