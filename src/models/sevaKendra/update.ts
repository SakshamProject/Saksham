export interface SevaKendraUpdateRequest {
  id: string;
  name: string;
  state: string;
  district: string;
  address: string;
  landLineNumber: string;
  mobileNumber: string;
  startDate: string;
  contactPerson: {
    id: string;
    name: string;
    email: string;
    phoneNumber1: string;
    phoneNumber2: string;
  };
  servicesBySevaKendra: {
    id: string;
    serviceName: string;
  }[];
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  isActive: boolean;
  auditLog: {
    id: string;
    status: string;
    date: string;
    description: string;
  }[];
}
export default SevaKendraUpdateRequest;
