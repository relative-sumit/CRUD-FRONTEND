import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  employeeId!: number;

  constructor(private router: Router) {}

  login() {
    
    if (this.employeeId) {      
      this.router.navigate(['/home'], { queryParams: { employeeId: this.employeeId } });
    } else {
      console.log('Invalid employee ID');
    }
  }
}
