import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

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

  addBankAccount(dto: any) {
    return this.apollo.mutate({
      mutation: ADD_BANK_ACCOUNT,
      variables: {
        dto,
      },
    });
  }
  
}
