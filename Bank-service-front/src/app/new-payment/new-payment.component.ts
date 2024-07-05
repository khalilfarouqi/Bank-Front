import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { BankAccountService } from '../service/bank-account.service';
import { BankAccountDto } from '../models/BankAccountDto';
import { TransactionService } from '../service/transaction.service';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrls: ['./new-payment.component.css']
})
export class NewPaymentComponent implements OnInit {
  @ViewChild('accountForm') accountForm!: NgForm;
  bankAccounts: BankAccountDto[] = [];
  paymentForm: FormGroup;
  isLoading = false;
  errorMessage: any;

  constructor(
    private transactionService: TransactionService,
    private bankAccountService: BankAccountService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef) {
    this.paymentForm = this.fb.group({
      ribFrom: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      ribTo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/Login']);
    } else {
      if (this.authService.getRole() == "CLIENT"){
        this.bankAccountService.getBankAccountByUsername(this.authService.getUsername()).subscribe({
          next: (result) => {
            this.bankAccounts = result.data.bankAccountByUsername;
            this.cd.detectChanges();
          },
          error: (error) => {
            console.error('Error loading Bank account:', error);
          }
        });
    
        this.paymentForm.get('ribFrom')?.valueChanges.subscribe(value => {
          console.log('RIB has changed:', value);
        });
      } else {
        this.router.navigate(['/home']);
      }
    }
  }

  onSubmit() {
    if (this.paymentForm.valid) {
      const selectedRIB = this.getSelectedBankAccount();
      console.log('Form Data:', this.paymentForm.value);
      console.log('Selected RIB:', selectedRIB);
      // Additional submission logic here
    } else {
      console.error('Form is invalid');
    }
  }

  getSelectedBankAccount() {
    const selectedRIB = this.paymentForm.get('ribFrom')?.value;
    console.log('Selected RIB:', selectedRIB);
    return selectedRIB;
  }

  newPayment(formData: any) {
    this.isLoading = true;
    this.errorMessage = null;
  
    formData.userName = "user4";

    this.transactionService.createTransaction(formData).subscribe({
      next: (response: any) => {
        console.log("response ---> " + response);
        if (response.data && response.data.addWirerTransfer) {
          const successMessage = response.data.addWirerTransfer.message;
          if (successMessage) {
            alert(successMessage);
          }
        } else {
          console.error('Unexpected response structure:', response);
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
    if (error.graphQLErrors && error.graphQLErrors.length > 0) {
      // Handle errors returned from the GraphQL server
      this.errorMessage = error.graphQLErrors.map((err: any) => err.message).join(', ');
    } else if (error.networkError) {
      // Handle network errors
      this.errorMessage = 'Network error: ' + error.networkError.message;
    } else {
      this.errorMessage = 'An unexpected error occurred';
    }
    console.error('Error Details:', this.errorMessage);
    this.isLoading = false;
  }
}
