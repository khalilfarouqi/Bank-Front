import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AddNewClientComponent } from './add-new-client/add-new-client.component';
import { NewBankAccountComponent } from './new-bank-account/new-bank-account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewPaymentComponent } from './new-payment/new-payment.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: "login", component: LoginComponent},
  { path: "signup", component: SignupComponent},
  { path: "newClient", component: AddNewClientComponent},
  { path: "newAccount", component: NewBankAccountComponent},
  { path: "dashboard", component: DashboardComponent},
  { path: "newPayment", component: NewPaymentComponent},
  { path: "changePassword", component: ChangePasswordComponent},
  { path: "home", component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
