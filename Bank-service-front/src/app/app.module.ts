import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddNewClientComponent } from './add-new-client/add-new-client.component';
import { NewBankAccountComponent } from './new-bank-account/new-bank-account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewPaymentComponent } from './new-payment/new-payment.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { ApolloModule } from 'apollo-angular';
import { GraphqlModule } from './graphql/graphql.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    AddNewClientComponent,
    NewBankAccountComponent,
    DashboardComponent,
    NewPaymentComponent,
    ChangePasswordComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ApolloModule,
    HttpClientModule,
    GraphqlModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
