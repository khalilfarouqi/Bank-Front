import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isLoading = false;
  errorMessage: any;
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.isLoading = true;
    this.errorMessage = null;

    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
        this.isLoading = false;
      },
      error: err => {
        console.error('Login error', err);
        this.handleError(err);
        this.isLoading = false;
      }
    });
  }

  handleError(error: any) {
    this.errorMessage = error.graphQLErrors[0]?.message || 'An unexpected error occurred';
  }

}
