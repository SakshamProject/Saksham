export interface SevaKendra {
  name: string;
  state: string;
  district: string;
  address: string;
  landLineNumber: string;
  mobileNumber: string;
  startDate: string;
  contactPersonName: string;
  contactPersonEmail: string;
  contactPersonPhoneNumber1: string;
  contactPersonPhoneNumber2: string;
  servicesBySevaKendra: string[];
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  isActive: boolean;
  auditLog: {
    status: string;
    date: string;
    description: string;
  }[];
}
