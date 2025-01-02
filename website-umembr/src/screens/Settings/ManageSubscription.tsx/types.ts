export interface PaymentMethodResponse {
      success: boolean;
      subscriptionDetails: SubscriptionDetails;
      paymentMethod: PaymentMethod;
      message: string;
  }
 export interface SubscriptionDetails {
			status: string;
			startDate: string;
			endDate: string;
			nextInvoiceAmount: string;
		}
  export interface PaymentMethod {
    id: string;
    object: string;
    allow_redisplay: string;
    billing_details: BillingDetails;
    card: Card;
    created: number;
    customer: string;
    livemode: boolean;
    metadata: Record<string, unknown>;
    type: string;
  }
  
  export interface BillingDetails {
    address: Address;
    email: string;
    name: string;
    phone: string | null;
  }
  
  export interface Address {
    city: string | null;
    country: string;
    line1: string | null;
    line2: string | null;
    postal_code: string;
    state: string | null;
  }
  
  export interface Card {
    brand: string;
    checks: CardChecks;
    country: string;
    display_brand: string;
    exp_month: number;
    exp_year: number;
    fingerprint: string;
    funding: string;
    generated_from: string | null;
    last4: string;
    networks: CardNetworks;
    regulated_status: string;
    three_d_secure_usage: ThreeDSecureUsage;
    wallet: string | null;
  }
  
  export interface CardChecks {
    address_line1_check: string | null;
    address_postal_code_check: string;
    cvc_check: string;
  }
  
  export interface CardNetworks {
    available: string[];
    preferred: string | null;
  }
  
  export interface ThreeDSecureUsage {
    supported: boolean;
  }
  export interface ManageSubscriptionProps {
    paymentMethodResponse: PaymentMethodResponse| undefined;
  }