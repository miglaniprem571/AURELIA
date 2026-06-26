export const pricingMatrix = {
  INR: { starter: 999, pro: 2499, enterprise: 5999 },
  USD: { starter: 12, pro: 29, enterprise: 79 },
  EUR: { starter: 11, pro: 27, enterprise: 74 }
} as const;

export type Currency = keyof typeof pricingMatrix;
export type BillingCycle = 'monthly' | 'annual';
export type PlanKey = 'starter' | 'pro' | 'enterprise';
