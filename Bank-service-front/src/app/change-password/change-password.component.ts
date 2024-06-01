import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../service/user.service';
import { NgForm } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { CustomerService } from '../service/customer.service';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent implements OnInit {
  
  @ViewChild('passwordForm') passwordForm!: NgForm;
  errorMessage: any;
  isLoading = false;

  constructor(
    private userService: UserService,
    private customerService: CustomerService,
    private authService: AuthService,
    private router: Router) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/Login']);
    }
  }

  updatePassword(formData: any) {
    this.isLoading = true;
    this.errorMessage = null;

    formData.username = this.authService.getUsername();

    this.userService.updatePassword(formData).subscribe({
      next: (response) => {
        this.passwordForm.resetForm();
      },
      error: (error) => {
        console.error('GraphQL Error', error);
        this.handleError(error);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
    
  }

  handleError(error: any) {
    this.errorMessage = error.graphQLErrors[0]?.message || 'An unexpected error occurred';
  }
}
