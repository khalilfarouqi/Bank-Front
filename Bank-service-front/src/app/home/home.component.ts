import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { CustomerService } from '../service/customer.service';
import { TransactionService } from '../service/transaction.service';
import { BankAccountService } from '../service/bank-account.service';
import { BankAccountDto } from '../models/BankAccountDto';
import { CustomerDto } from '../models/CustomerDto';
import { TransactionDto } from '../models/TransactionDto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  bankAccounts: BankAccountDto[] = [];
  transactions: TransactionDto[] = [];
  customers: CustomerDto[] = [];

  constructor(
    private authService: AuthService,
    private bankAccountService:BankAccountService, 
    private transactionService:TransactionService,
    private customerService:CustomerService,
    private router: Router) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/Login']);
    } else {
      if (this.authService.getRole() == "CLIENT") {
        this.router.navigate(['/dashboard']);
      } else {
        this.bankAccountService.getBankAccounts().subscribe({
          next: (result) => {
            this.bankAccounts = result;
            console.log("bankAccounts  -->  " + this.bankAccounts)
          },
          error: (error) => {
            console.log("erreur  --->  " + error.message)
            console.error('There was an error sending the query', error);
          },
        });

        this.transactionService.getTransactions().subscribe({
          next: (result) => {
            this.transactions = result;
            console.log("transactions  -->  " + result)
          },
          error: (error) => {
            console.log("erreur  --->  " + error.message)
            console.error('There was an error sending the query', error);
          },
        });

        this.customerService.getCustomers().subscribe({
          next: (result) => {
            this.customers = result;
            console.log("customers  -->  " + result)
          },
          error: (error) => {
            console.log("erreur  --->  " + error.message)
            console.error('There was an error sending the query', error);
          },
        });
      }
      
    }
  }
  
  formatCurrency(amount: number): string {
    const formatted = new Intl.NumberFormat('fr-MA', { style: 'currency', currency: 'MAD' }).format(amount);
    return formatted.replace('MAD', '') + ' MAD';
  }

}
