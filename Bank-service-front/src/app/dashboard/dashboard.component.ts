import { Component, OnInit } from '@angular/core';
import { BankAccountService } from '../service/bank-account.service';
import { BankAccountDto } from '../models/BankAccountDto';
import { TransactionDto } from '../models/TransactionDto';
import { TransactionService } from '../service/transaction.service';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

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
    private authService: AuthService,
    private router: Router) {}

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/Login']);
    } else {
      if (this.authService.getRole() == "CLIENT") {
        this.bankAccountService.getBankAccountByUsername(this.authService.getUsername()).subscribe({
          next: (result) => {
            this.bankAccounts = result.data.bankAccountByUsername;
            this.selectedRIB = this.bankAccounts[0].rib
            this.onChangeSelectedAccount()
          },
          error: (error) => {
            console.log("erreur  --->  " + error.message)
            console.error('There was an error sending the query', error);
          },
        });
      } else {
        this.router.navigate(['/home']);
      }
    }
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
