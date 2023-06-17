import { Component } from '@angular/core';
import { User } from '../../model/User';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent {
  user: User;

  constructor(private router: Router, private authService: AuthService) {
    this.user = new User(0, '', '', '', false);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  saveUser() {
    if (this.user.username == 'admin') {
      this.user.isAdmin = true;
    } else {
      this.user.isAdmin = false;
    }
    this.authService.registerUser(this.user).subscribe(
      (data) => {
        console.log(data);
        this.goToLogin();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onSubmit() {
    this.saveUser();
  }
}
