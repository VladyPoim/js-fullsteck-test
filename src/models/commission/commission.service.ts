import { Injectable } from '@nestjs/common';
import * as CommissionConfig from './commission.config.ts';
import { roundToPrecision } from '../../common/helpers/number.helper.ts';

@Injectable()
export class CommissionService {
  calculateCashInCommission(amount: number): number {
    const { percent, max } = CommissionConfig.CashInCommissionConfig;
    const commission = amount * percent;

    return Math.min(commission, max.amount);
  }

  calculateNaturalPersonCashOutCommission(amount: number, totalCashOutThisWeek: number): number {
    const { percent, freeAmountPerWeek } = CommissionConfig.NaturalPersonCashOutCommissionConfig;
    let commission = 0;

    if (totalCashOutThisWeek >= freeAmountPerWeek) {
      commission = amount * percent;
    } else if (totalCashOutThisWeek + amount > freeAmountPerWeek) {
      const taxableAmount = amount - (freeAmountPerWeek - totalCashOutThisWeek);
      commission = taxableAmount * percent;
    }

    return roundToPrecision(commission, 2);
  }

  calculateLegalPersonCashOutCommission(amount: number): number {
    const { percent, min } = CommissionConfig.LegalPersonCashOutCommissionConfig;
    const commission = Math.max(amount * percent, min.amount);
    return roundToPrecision(commission, 2);
  }
}
