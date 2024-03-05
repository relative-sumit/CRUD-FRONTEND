import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  register!: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.register = this.fb.group({
      profile: this.fb.group({
        firstName: [''],
        middleName: [''],
        lastName: [''],
        contact: this.fb.group({
          phone: this.fb.group({
            countryCode: [''],
            primary: [''],
            backup: [''],
            emergency: ['']
          }),
          email: this.fb.group({
            companyMail: [''],
            personalMail: ['']
          }),
          location: this.fb.group({
            flat: [''],
            area: [''],
            landmark: [''],
            pincode: [''],
            city: [''],
            state: ['']
          })
        })
      }),
      personal: this.fb.group({
        dob: [''],
        doj: [''],
        doc: ['']
      }),
      employee: this.fb.group({
        department: [''],
        designation: [''],
        managerDetails: ['']
      }),
      asset: this.fb.group({
        assetId: [''],
        assetName: [''],
        assetModel: [''],
        assetType: ['']
      }),
      role: ['']
    });
  }

  show() {
    console.log(this.register.value);
  }
  data: any;
  name: any;
  addData(){
    this.http.post("http://localhost:3000/employee/add", this.register.value)
    .subscribe(response =>{
      // console.log(response);
      this.data = response
      this.name =  this.data.Employee.profile.firstName
      console.log(`Welcome ${this.name} to the IN-Team`);
      alert(`Welcome ${this.name} to the IN-Team`);
    })
  }
}
