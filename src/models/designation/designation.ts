
interface DesignationResult{
    
        id: string;
        name: string;
        sevaKendraId: string;
        sevaKendra: {
            id: string;
            name: string;
            districtId: string;
            mobileNumber: string;
            landLineNumber: string;
            startDate: string;
            contactPersonId: string;
            district: {
                id: string;
                name: string;
                stateId: string;
                state: {
                    id: string;
                    name: string;
                }
            },
            contactPerson: {
                id: string;
                name: string;
                email: string;
                phoneNumber1:string;
                phoneNumber2:string;
            }
        }
    

}

interface DesignationResponse{
    results:[DesignationResult],
    count: number,
	start: number,
	rows: number,
	orderBy: string,
	reverse:boolean
}

export {DesignationResponse};