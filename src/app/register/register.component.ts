import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  register!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.register = this.fb.group({
      profile: this.fb.group({
        firstName: [''],
        middleName: [''],
        lastName: [''],
        contact: this.fb.group({
          phone: this.fb.group({
            countryCode: ['+91'],
            primary: ['9876543212'],
            backup: ['9876543212'],
            emergency: ['9876543212'],
          }),
          email: this.fb.group({
            companyMail: ['example@emp.in'],
            personalMail: [''],
          }),
          location: this.fb.group({
            flat: ['abc'],
            area: ['hij'],
            landmark: ['near xyz'],
            pincode: ['980789'],
            city: ['y-city'],
            state: ['x-state'],
          }),
        }),
      }),
      personal: this.fb.group({
        dob: ['2000-01-02'],
        doj: ['2000-01-02'],
        doc: ['2000-01-02'],
      }),
      employee: this.fb.group({
        department: ['IT'],
        designation: [''],
        managerDetails: [''],
      }),
      asset: this.fb.group({
        assetId: ['Dis'],
        assetName: ['co'],
        assetModel: ['model'],
        assetType: ['type'],
      }),
      role: [''],
    });
  }

  show() {
    console.log(this.register.value);
  }

  data: any;
  name: any;
  employeeId: any;

  addData() {
    this.http
      .post('http://localhost:3000/employee/add', this.register.value)
      .subscribe((response) => {
        // console.log(response);
        this.data = response;
        this.name = this.data.Employee.profile.firstName;
        this.employeeId = this.data.Employee.employeeId;
        console.log(this.name);
        console.log(this.employeeId);
        // console.log(`Welcome ${this.name} to the IN-Team`);
        // alert(`Welcome ${this.name} to the IN-Team`);
        // this.toastr.success(
        //   `Welcome ${this.name} to IN-Team`,
        //   'Congratulations 🎉🤝',
        //   {
        //     timeOut: 15000,
        //     closeButton: true,
        //     progressBar: true,
        //     progressAnimation: 'decreasing',
        //     newestOnTop: true,
        //     positionClass: 'toast-top-center',
        //     enableHtml: true,
        //   }
        // );
        this.notificationService.sendNotification(this.employeeId, this.name);
      });
  }
}
