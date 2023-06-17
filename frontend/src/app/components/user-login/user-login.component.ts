import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent {
  user: User;

  constructor(private router: Router, private authService: AuthService) {
    this.user = new User(0, '', '', '', false);
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  loginUser() {
    this.authService.loginUser(this.user).subscribe(
      (data) => {
        this.authService.saveToken(data.token);
        this.authService.saveUser(this.user.username);
        let isAdmin: boolean = false;
        if (this.user.username === 'admin') {
          isAdmin = true;
        }
        this.authService.saveAdmin(isAdmin);
        this.goToHome();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onSubmit() {
    this.loginUser();
  }
}
