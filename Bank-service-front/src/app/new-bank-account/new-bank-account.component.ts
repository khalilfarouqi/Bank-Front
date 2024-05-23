import { Component, ViewChild } from '@angular/core';
import { BankAccountService } from '../service/bank-account.service';
import { NgForm } from '@angular/forms';
import { AddBankAccountResponse } from '../models/AddBankAccountResponse';

@Component({
  selector: 'app-new-bank-account',
  templateUrl: './new-bank-account.component.html',
  styleUrl: './new-bank-account.component.css'
})
export class NewBankAccountComponent {
  
  @ViewChild('accountForm') accountForm!: NgForm;
  errorMessage: any;
  isLoading = false;

  constructor(private bankAccountService:BankAccountService) {}

  addBankAccount(formData: any) {
    this.isLoading = true;
    this.errorMessage = null;
  
    this.bankAccountService.addBankAccount(formData).subscribe({
      next: (response: any) => { // Type 'any' utilisé ici, pas idéal mais fonctionnel
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
