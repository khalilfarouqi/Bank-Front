import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

const UPDATE_PASSWORD = gql`
  mutation updatePassword($dto: UpdatePasswordRequest!) {
    updatePassword(dto: $dto) {
      message
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apollo: Apollo) { }

  updatePassword(dto: any) {
    return this.apollo.mutate({
      mutation: UPDATE_PASSWORD,
      variables: {
        dto,
      },
    });
  }
}
