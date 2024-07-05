import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

const UPDATE_PASSWORD = gql`
  mutation updatePassword($dto: UpdatePasswordRequest!) {
    updatePassword(dto: $dto) {
      message
    }
  }
`;

const SIGNUP_USER = gql`
  mutation signUpUser($dto: AddUserRequest!) {
    signUpUser(dto: $dto) {
      message
      password
      userName
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

  signUpUser(dto: any) {
    return this.apollo.mutate({
      mutation: SIGNUP_USER,
      variables: {
        dto,
      },
    });
  }
}
