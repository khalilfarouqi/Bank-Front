import { Component, ViewChild } from '@angular/core';
import { UserService } from '../service/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  
  @ViewChild('passwordForm') passwordForm!: NgForm;
  errorMessage: any;
  isLoading = false;

  constructor(private userService: UserService) {}

  updatePassword(formData: any) {
    this.isLoading = true;
    this.errorMessage = null;

    console.log(formData);

    formData.username = "khalil.farouqaa";

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
