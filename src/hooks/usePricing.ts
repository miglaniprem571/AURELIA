import { useMemo } from 'react';
import { pricingMatrix, type BillingCycle, type Currency, type PlanKey } from '../utils/pricingMatrix';

export function usePricing({ currency, billing }: { currency: Currency; billing: BillingCycle }) {
  const priceMap = useMemo(() => {
    const base = pricingMatrix[currency];
    return {
      starter: billing === 'annual' ? Math.round(base.starter * 12 * 0.8) : base.starter,
      pro: billing === 'annual' ? Math.round(base.pro * 12 * 0.8) : base.pro,
      enterprise: billing === 'annual' ? Math.round(base.enterprise * 12 * 0.8) : base.enterprise
    } as Record<PlanKey, number>;
  }, [billing, currency]);

  const annualSavings = useMemo(() => {
    const base = pricingMatrix[currency];
    return {
      starter: Math.round(base.starter * 12 * 0.2),
      pro: Math.round(base.pro * 12 * 0.2),
      enterprise: Math.round(base.enterprise * 12 * 0.2)
    } as Record<PlanKey, number>;
  }, [currency]);

  return { priceMap, annualSavings };
}
