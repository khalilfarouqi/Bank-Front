export interface UpdatePasswordRequest {
    username: String;
    actPassword: String;
    newPassword: String;
    newPasswordConfirm: String;
  }
  
  export interface QueryResult {
    users: UpdatePasswordRequest[];
  }