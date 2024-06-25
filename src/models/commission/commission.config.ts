import { CURRENCY } from '../../common/constants/currency.ts';

export const CashInCommissionConfig = {
  percent: 0.0003,
  max: {
    amount: 5,
    currency: CURRENCY.EUR,
  },
};

export const NaturalPersonCashOutCommissionConfig = {
  percent: 0.003,
  freeAmountPerWeek: 1000,
  currency: CURRENCY.EUR,
};

export const LegalPersonCashOutCommissionConfig = {
  percent: 0.003,
  min: {
    amount: 0.5,
    currency: CURRENCY.EUR,
  },
};
