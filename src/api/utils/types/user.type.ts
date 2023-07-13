export interface IregisterUser {
  name: string;
  email: string;
  pan: number;
  gst: string;
  bankName: string;
  accountNumber: number;
  accountHolderName: string;
  password?: string;
  // status?: enum;
  currentUrl?: string;
}
