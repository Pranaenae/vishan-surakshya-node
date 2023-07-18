export interface IregisterUser {
  _id?: string;
  name: string;
  email: string;
  pan?: number;
  gst?: string;
  address?: string;
  userType: string;
  mobileNumber?: string;
  bankName: string;
  accountNumber: number;
  accountHolderName: string;
  password?: string;
  // status?: enum;
  currentUrl?: string;
}
