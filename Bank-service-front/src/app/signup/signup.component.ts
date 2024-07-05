import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../service/customer.service';
import { UserService } from '../service/user.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddCustomerRequest } from '../models/AddCustomerRequest';
import { AddUserRequest } from '../models/AddUserRequest';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form!: FormGroup;
  customerForm: AddCustomerRequest = new AddCustomerRequest();
  userForm: AddUserRequest = new AddUserRequest();
  userType = 'customer';
  errorMessage: any;
  isLoading = false;

  constructor(
    private customerService: CustomerService, 
    private userService: UserService, 
    private formBuilder: FormBuilder,
    private router: Router) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      userType: ['customer', Validators.required],
      firstName: [''],
      lastName: [''],
      dateOfBirth: [''],
      address: [''],
      identityRef: [''],
      email: ['', Validators.email],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, { validators: this.passwordMatchValidator });
  }

  onSubmit(formData: any) {
    this.signUp(formData);
  }

  onUserTypeChange(type: string) {
    this.userType = type;
    this.form.controls['userType'].setValue(type);
  }

  signUp(formData: any) {
    this.isLoading = true;
    this.errorMessage = null;

    if (this.userType === 'customer') {

      if (formData.dateOfBirth) {
        const date = new Date(formData.dateOfBirth);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        formData.dateOfBirth = `${year}/${month}/${day}`;
      }

      console.log('formData', formData);
      this.customerForm = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        identityRef: formData.identityRef,
        address: formData.address,
        dateOfBirth: formData.dateOfBirth,
        username: formData.username,
        password: formData.password
      };
      console.log('formData', this.userForm);

      this.customerService.signUpCustomer(this.customerForm).subscribe({
        next: (response) => {
          console.log('Customer created', response);
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
    
    if (this.userType === 'admin') {
      this.userForm = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        userName: formData.username,
        password: formData.password
      };
      this.userService.signUpUser(this.userForm).subscribe({
        next: (response) => {
          console.log('Agent guichet created', response);
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
    this.router.navigate(['/login']);
  }

  handleError(error: any) {
    this.errorMessage = error.graphQLErrors[0]?.message || 'An unexpected error occurred';
  }

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')!.value;
    const confirmPassword = control.get('confirmPassword')!.value;
    return password === confirmPassword ? null : { mismatch: true };
  }
}
