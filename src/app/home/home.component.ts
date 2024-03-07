import { Component } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService
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
}
