import {User} from "./user";

export interface Transfer {
    adminFromCodeNumber: string;
    adminFromEmail: string;
    adminFromId: number;
    adminFromName: string;
    adminFromPhone: string;
    agentFromCodeNumber: string;
    agentFromEmail: string;
    agentFromId: number;
    agentFromName: string;
    agentFromPhone: string;
    agentToCodeNumber: string;
    agentToEmail: string;
    agentToId: number;
    agentToName: string;
    agentToPhone: string;
    dateCreated: string;
    credit: number;
    id: number;
    newCreditFrom: number;
    newCreditTo: number;
    originCreditFrom: number;
    originCreditTo: number;
}

export interface TransferResponse {
    agent: User;
    transfers: Transfer[];
}
