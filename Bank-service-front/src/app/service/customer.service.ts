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
            username
            identityRef
            firstName
            lastName
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
}
