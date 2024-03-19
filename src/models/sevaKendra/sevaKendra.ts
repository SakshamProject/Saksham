export interface SevaKendraRequestResponse {
  name: string;
  state: string;
  district: string;
  address: string;
  landLineNumber: string;
  mobileNumber: string;
  startDate: Date;
  contactPerson: {
    name: string;
    email: string;
    phoneNumber1: string;
    phoneNumber2: string;
  };
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
  };
}

