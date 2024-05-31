import { Component, OnInit, ViewChild } from '@angular/core';
import { BankAccountService } from '../service/bank-account.service';
import { NgForm } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-bank-account',
  templateUrl: './new-bank-account.component.html',
  styleUrl: './new-bank-account.component.css'
})
export class NewBankAccountComponent implements OnInit {
  
  @ViewChild('accountForm') accountForm!: NgForm;
  errorMessage: any;
  isLoading = false;

  constructor(
    private bankAccountService:BankAccountService,
    private authService: AuthService,
    private router: Router) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/Login']);
    }
  }

  addBankAccount(formData: any) {
    this.isLoading = true;
    this.errorMessage = null;
  
    this.bankAccountService.addBankAccount(formData).subscribe({
      next: (response: any) => {
        console.log('bank account created', response);
        const successMessage = response.data.addBankAccount.meessage;
        console.log("successMessage  -->  " + successMessage);
        if (successMessage) {
          alert(successMessage);
        }
        this.accountForm.resetForm();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error', error);
        this.handleError(error);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  handleError(error: any) {
    this.errorMessage = error.error.message || 'Une erreur inattendue s’est produite';
    this.isLoading = false;
  }

}
