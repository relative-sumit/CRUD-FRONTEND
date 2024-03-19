import { Component } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  employeeId!: string;

  data: any;
  name: any;

  constructor(
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private http: HttpClient,
    private empService: EmployeeService
  ) {
    this.notificationService.notifications.subscribe((data) => {
      this.toastr.success(
        `Welcome ${data} to IN-Team`,
        'Congratulations 🎉🤝',
        {
          timeOut: 30000,
          closeButton: true,
          progressBar: true,
          progressAnimation: 'decreasing',
          newestOnTop: true,
          positionClass: 'toast-top-center',
          enableHtml: true,
        }
      );
    });
  }
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.employeeId = params['employeeId'];
    });
    this.notificationService.joinRoom(this.employeeId);
  }

  //navigating to update page
  eId:any;
  
 
  navidateToUpdatePage(){
    // console.log();
    const Id = {
      header: new HttpHeaders({
        'empId': this.eId
      })
    };

    this.http.get("http://localhost:3000/employee/getOne", {headers: Id.header})
    .subscribe(
      response =>{
        console.log(response);
        this.empService.setEmpData(response);
        this.router.navigate(['/update']);
      }, error =>{
        console.log(error); 
      }
    );
  }
}
