import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

const CREATE_TRANSACTION = gql`
  mutation addWirerTransfer($dto: AddWirerTransferRequest!) {
    addWirerTransfer(dto: $dto) {
      message
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private apollo: Apollo) { }

  getTop10TransactionsById(id: string) {
    return this.apollo.query<any>({
      query: gql`
        query getTop10TransactionsById($id: ID!) {
          getTop10TransactionsById(id: $id) {
            createdAt
            transactionType
            amount
            users {
              userName
              firstName
              lastName
            }
            bankAccount {
              rib
              amount
              createdAt
              accountStatus
            }
          }
        }
      `,
      variables: {
        id:id
      }
    });
  }

  createTransaction(dto: any) {
    return this.apollo.mutate({
      mutation: CREATE_TRANSACTION,
      variables: {
        dto,
      },
    });
  }
}
