export enum ENegotiation {
  ACCEPT = "accept",
  DENY = "deny",
  NEGOTIATE = "negotiate",
}

export interface INegotiation {
  id: number;
  product: number;
  user: number;
  buyerNegotiationPrice: number;
  buyerNegotiationDeliveryCost: number;
  remarks: string;
  negotiationStatus: ENegotiation;
  sellerNegotiationPrice: number;
  sellerNegotiationDeliveryCost: number;
}
