export interface UsersDto {
    lastName: String;
    firstName: String;
    cin: String;
    dateOfBirth: Date;
    email: String;
    address: String;

    userName: String;
    password: String;

    profile: String;
  }
  
  export interface QueryResult {
    users: UsersDto[];
  }