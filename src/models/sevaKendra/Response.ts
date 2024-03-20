export interface SevaKendraResponse {
  name: string | null;
  address: string | null;
  landLineNumber: string | null;
  mobileNumber: string | null;
  startDate: string | null;
  contactPerson: {
    name: string | null;
    email: string | null;
    phoneNumber1: string | null;
    phoneNumber2: string | null;
  };
  createdAt: string | null;
  createdBy: string | null;
  updatedAt: string | null;
  updatedBy: string | null;
  isActive: boolean | null;

  _count: {
    auditLogs: number | null;
    services: number | null;
  };
  auditLogs: {
    status: string | null;
    date: string | null;
    description: string | null;
  }[];
  services: {
    id: string | null;
    serviceId: string | null;
  }[];
  district: {
    name: string | null;
    state: {
      name: string | null;
    };
  };
}
