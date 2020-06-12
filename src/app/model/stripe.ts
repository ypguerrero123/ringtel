export interface Charge {
    id: string,
    object: string,
    amount: number,
    amount_refunded: number,
    application: any,
    application_fee: any,
    application_fee_amount: any,
    balance_transaction: string,
    billing_details: BillingDetails,
    calculated_statement_descriptor: any,
    captured: boolean,
    created: any,
    currency: string,
    customer: string,
    description: string,
    disputed: boolean,
    failure_code: any,
    failure_message: any,
    fraud_details: any,
    invoice: any,
    livemode: any,
    metadata: any,
    on_behalf_of: any,
    order: any,
    outcome: any,
    paid: boolean,
    payment_intent: any,
    payment_method: string,
    payment_method_details: PaymentMethodDetals,
    receipt_email: any,
    receipt_number: any,
    receipt_url: string,
    refunded: boolean,
    refunds: Refunds,
    review: any,
    shipping: any,
    source_transfer: any,
    statement_descriptor: any,
    statement_descriptor_suffix: any,
    status: string,
    transfer_data: any,
    transfer_group: any
}

export interface PaymentMethodDetals {
    card: Card,
    type: string
}

export interface Refunds {
    object: string,
    data: any,
    has_more: boolean,
    url: string
}

export interface Method {
    id: string;
    object: string;
    billing_details: BillingDetails;
    card: Card;
    created: any;
    customer: string;
    livemode: boolean;
    metadata: any;
    type: string;
}

export interface Card {
    brand: string;
    checks: Checks;
    country: string;
    exp_month: number;
    exp_year: number;
    fingerprint: string;
    funding: string;
    generated_from: any;
    last4: string;
    three_d_secure_usage: ThreeSecure;
    wallet: any;
}

export interface Checks {
    address_line1_check: any;
    address_postal_code_check: string;
    cvc_check: string;
}

export interface BillingDetails {
    address: Address;
    email: string;
    name: string;
    phone: string;
}

export interface Address {
    city: any;
    country: any;
    line1: any;
    line2: any;
    postal_code: string;
    state: any;
}

export interface ThreeSecure {
    supported: boolean;
}
