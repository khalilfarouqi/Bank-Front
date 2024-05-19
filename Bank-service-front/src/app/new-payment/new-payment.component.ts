import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../service/customer.service';
import { log } from 'console';

@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrl: './new-payment.component.css'
})
export class NewPaymentComponent implements OnInit {
  customers: any[] = [];
  loading = true;
  error: any;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customerService.getCustomers()
      .subscribe({
        next: (customers) => {
          this.customers = customers;
          this.loading = false;
        },
        error: (error) => {
          this.error = error;
          this.loading = false;
          console.error('Error loading customers:', error);
        }
      });
  }

}
