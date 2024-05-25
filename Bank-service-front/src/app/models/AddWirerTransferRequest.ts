export interface AddWirerTransferRequest {
    ribFrom: string;
    ribTo: string;
    amount: number;
    userName: string;
}
  
export interface QueryResult {
    addWirerTransferRequest: AddWirerTransferRequest[];
}