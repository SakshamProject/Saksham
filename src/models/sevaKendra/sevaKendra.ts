export interface SevaKendraRequestResponse {
  name: string;
  state: string;
  district: string;
  city: string;
  address: string;
  landLineNumber: string;
  mobileNumber: string;
  startDate: Date;
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
    date: Date;
    description: string;
  }[];
}

