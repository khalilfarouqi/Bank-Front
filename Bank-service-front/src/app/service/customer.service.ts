import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomerDto, QueryResult } from '../models/CustomerDto';

const CREATE_CUSTOMER = gql`
  mutation createCustomer($dto: AddCustomerRequest!) {
    createCustomer(dto: $dto) {
      firstName
      lastName
      email
      identityRef
      address
      dateOfBirth
    }
  }
`;

const SIGNUP_CUSTOMER = gql`
  mutation signUpCustomer($dto: AddCustomerRequest!) {
    signUpCustomer(dto: $dto) {
      address
      dateOfBirth
      email
      firstName
      identityRef
      lastName
      password
      username
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private apollo: Apollo) {}

  getCustomers(): Observable<CustomerDto[]> {
    return this.apollo.watchQuery<{ customers: CustomerDto[] }>({
      query: gql`
        query {
          customers {
            firstName
            lastName
            identityRef
            email
            dateOfBirth
            address
            username
          }
        }
      `
    }).valueChanges.pipe(
      map(result => result.data.customers)
    );
  }

  createCustomer(dto: any) {
    return this.apollo.mutate({
      mutation: CREATE_CUSTOMER,
      variables: {
        dto,
      },
    });
  }

  signUpCustomer(dto: any) {
    return this.apollo.mutate({
      mutation: SIGNUP_CUSTOMER,
      variables: {
        dto,
      },
    });
  }
}
