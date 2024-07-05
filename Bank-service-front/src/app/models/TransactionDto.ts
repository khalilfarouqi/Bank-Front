import { BankAccountDto } from "./BankAccountDto";
import { UsersDto } from "./UsersDto";

export interface TransactionDto {
    createdAt: string;
    transactionType: string;
    amount: number;
    bankAccount: BankAccountDto;
    users: UsersDto;
}
  
export interface QueryResult {
    transaction: TransactionDto[];
}