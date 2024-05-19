export interface CustomerDto {
  username: string;
  identityRef: string;
  firstName: string;
  lastName: string;
}

export interface QueryResult {
  customers: CustomerDto[];
}