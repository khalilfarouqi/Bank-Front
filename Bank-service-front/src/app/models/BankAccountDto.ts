import { AccountStatus } from "./AccountStatus";
import { CustomerDto } from "./CustomerDto";

export interface BankAccountDto {
    id: string;
    rib: string;
    amount: number;
    createdAt: string;
    accountStatus: AccountStatus;
    customer: CustomerDto;
}
  
export interface QueryResult {
    bankAccount: BankAccountDto[];
}