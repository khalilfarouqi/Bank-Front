import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { BankAccountDto } from '../models/BankAccountDto';

const ADD_BANK_ACCOUNT = gql`
  mutation addBankAccount($dto: AddBankAccountRequest!) {
    addBankAccount(dto: $dto) {
      message
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {

  constructor(private apollo: Apollo) { }

  getBankAccounts(): Observable<BankAccountDto[]> {
    return this.apollo.watchQuery<{ bankAccounts: BankAccountDto[] }>({
      query: gql`
        query {
          bankAccounts {
            accountStatus
            amount
            createdAt
            rib
            customer {
              identityRef
              lastName
              firstName
            }
          }
        }
      `
    }).valueChanges.pipe(
      map(result => result.data.bankAccounts)
    );
  }

  getBankAccountById(id: string) {
    return this.apollo.query<any>({
      query: gql`
        query GetBankAccountById($id: ID!) {
          bankAccountById(id: $id) {
            id
            rib
            amount
            createdAt
            accountStatus
          }
        }
      `,
      variables: {
        id:id
      }
    });
  }

  getBankAccountByUsername(username: string) {
    return this.apollo.query<any>({
      query: gql`
        query GetBankAccountByUsername($username: String!) {
          bankAccountByUsername(username: $username) {
            id
            rib
            amount
            createdAt
            accountStatus
          }
        }
      `,
      variables: {
        username:username
      }
    });
  }

  addBankAccount(dto: any) {
    return this.apollo.mutate({
      mutation: ADD_BANK_ACCOUNT,
      variables: {
        dto,
      },
    });
  }
  
}
