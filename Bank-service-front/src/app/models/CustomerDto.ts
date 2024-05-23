export interface CustomerDto {
  firstName: string;
  lastName: string;
  email: string;
  identityRef: string;
  address: string;
  dateOfBirth: string;
  username: string;
}

export interface QueryResult {
  customers: CustomerDto[];
}