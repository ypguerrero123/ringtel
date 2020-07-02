export interface Operation {
    id: number;
    agentFullName: string;
    agentId: number;
    agentEmail: string;
    client: string;
    service: string;
    amount: number;
    salePrice: number;
    sellingCost: number;
    status: string;
    accountToRecharge: string;
    dateCreated: string;
    soapTid: any;
    errorCodeApi: any;
    errorMessage: any;
}


