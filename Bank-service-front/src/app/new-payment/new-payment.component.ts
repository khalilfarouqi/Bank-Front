import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../service/customer.service';
import { CustomerDto } from '../models/CustomerDto';

@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrls: ['./new-payment.component.css']
})
export class NewPaymentComponent implements OnInit {
  customers: CustomerDto[] = [];
  paymentForm: FormGroup;

  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef) {
    this.paymentForm = this.fb.group({
      customerIdentityRef: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      clientAccountNumber: ['', Validators.required],
      motif: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getCustomer();
  }

  public getCustomer() {
    this.customerService.getCustomers().subscribe({
      next: (result) => {
        this.customers = result;
        this.cd.detectChanges(); // Forcer la détection des changements
      },
      error: (error) => {
        console.error('Error loading customers:', error);
      }
    });
  }

  onSubmit() {
    if (this.paymentForm.valid) {
      const paymentData = this.paymentForm.value;
      console.log('Form Data:', paymentData);
    } else {
      console.error('Form is invalid');
    }
  }
}
