import { Test, TestingModule } from '@nestjs/testing';
import { CommissionService } from '../commission.service.ts';

describe('CommissionService', () => {
  let commissionService: CommissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommissionService],
    }).compile();

    commissionService = module.get<CommissionService>(CommissionService);
  });

  it('should be defined', () => {
    expect(commissionService).toBeDefined();
  });

  it('should calculate cash-in commission correctly', () => {
    const amount = 200.00;
    const commission = commissionService.calculateCashInCommission(amount);
    expect(commission).toBe(0.06);
  });

  it('should calculate natural person cash-out commission correctly', () => {
    const amount = 300.00;
    const totalCashOutThisWeek = 1000; // Example total cash-out this week
    const expectedCommission = 0.9;

    const commission = commissionService.calculateNaturalPersonCashOutCommission(amount, totalCashOutThisWeek);
    expect(commission).toBe(expectedCommission); // Replace with expected commission value
  });

  it('should calculate legal person cash-out commission correctly', () => {
    const amount = 300.00;
    const commission = commissionService.calculateLegalPersonCashOutCommission(amount);
    expect(commission).toBe(0.90); // Replace with expected commission value
  });
});
