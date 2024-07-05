import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CustomerService } from '../service/customer.service';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new-client',
  templateUrl: './add-new-client.component.html',
  styleUrl: './add-new-client.component.css'
})
export class AddNewClientComponent implements OnInit {

  @ViewChild('clientForm') clientForm!: NgForm;
  errorMessage: any;
  isLoading = false;

  constructor(
    private customerService: CustomerService,
    private authService: AuthService,
    private router: Router) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/Login']);
    } else {
      if (this.authService.getRole() == "CLIENT") {
        this.router.navigate(['/home']);
      }
    }
  }

  addCustomer(formData: any) {
    this.isLoading = true;
    this.errorMessage = null;

    console.log(formData);

    if (formData.dateOfBirth) {
      const date = new Date(formData.dateOfBirth);
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const day = ('0' + date.getDate()).slice(-2);
      formData.dateOfBirth = `${year}/${month}/${day}`;
    }

    formData.username = `${formData.firstName}.${formData.lastName}`;

    this.customerService.createCustomer(formData).subscribe({
      next: (response) => {
        console.log('Customer created', response);
        this.clientForm.resetForm();
      },
      error: (error) => {
        console.error('GraphQL Error', error);
        this.handleError(error);
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
