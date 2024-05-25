import { Component, OnInit } from '@angular/core';
import { BankAccountService } from '../service/bank-account.service';
import { BankAccountDto } from '../models/BankAccountDto';
import { TransactionDto } from '../models/TransactionDto';
import { TransactionService } from '../service/transaction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  selectedRIB: string | undefined;
  bankAccounts: BankAccountDto[] = [];
  transactions: TransactionDto[] = [];

  constructor(
    private bankAccountService:BankAccountService, 
    private transactionService:TransactionService,
    private router: Router) {}

  ngOnInit() {
    this.bankAccountService.getBankAccountById('1').subscribe({
      next: (result) => {
        this.bankAccounts = result.data.bankAccountById;
      },
      error: (error) => {
        console.error('There was an error sending the query', error);
      },
    });
  }

  onChangeSelectedAccount() {
    if (this.selectedAccount) {
      this.transactionService.getTop10TransactionsById(this.selectedAccount?.id).subscribe({
        next: (result) => {
          this.transactions = result.data.getTop10TransactionsById;
        },
        error: (error) => {
          console.error('There was an error sending the query', error);
        },
      });
    } else {
      console.log('No account selected or account not found');
    }
  }

  get selectedAccount(): BankAccountDto | undefined {
    return this.bankAccounts.find(account => account.rib === this.selectedRIB);
  }
  
  formatCurrency(amount: number): string {
    const formatted = new Intl.NumberFormat('fr-MA', { style: 'currency', currency: 'MAD' }).format(amount);
    return formatted.replace('MAD', '') + ' MAD';
  }

  navigateToNewPayment() {
    this.router.navigate(['/newPayment']);
  }
}
