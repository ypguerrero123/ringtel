export interface User {
    id: number;
    name: string;
    balance: string;
    email: string;
    phoneCodeNumber: string;
    phone: string;
    enabled: boolean;
    enabledFingerPrint: boolean;
    role_admin: boolean;
    selling_cost_cubacel: string;
    sale_price_cubacel: string;
    selling_cost_nauta: string;
    sale_price_nauta: string;
    administrator_id: number;
    administrator_name: string;
    administrator_balance: number;
    administrator_balance_permitted: number;
    administrator_group_id: number;
    administrator_group_name: string;
    broker_post_sale: boolean;
}

export interface UserDataResponse {
    agent: User;
    data: OperationDataResponse
}

export interface OperationDataResponse {
    opAccepted: string,
    opPending: string,
    opFaileds: number,
    totalOperations: number,
    totalSellingSales: TotalSellingSales
}

export interface TotalSellingSales {
    totalSellingCost: string,
    totalSalePrice: string,
    total: string
}
