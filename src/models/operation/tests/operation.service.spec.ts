import { Test, TestingModule } from '@nestjs/testing';
import { CommissionService } from '../../commission/commission.service.ts';
import { USER_TYPE } from '../../user/user.enum.ts';
import { Operation } from '../operation.entity.ts';
import { OPERATION_TYPE } from '../operation.enum.ts';
import { OperationsService } from '../operation.service.ts';
import { CURRENCY } from '../../../common/constants/currency.ts';

describe('OperationsService', () => {
  let operationsService: OperationsService;
  let commissionService: CommissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OperationsService,
        CommissionService,
      ],
    }).compile();

    operationsService = module.get<OperationsService>(OperationsService);
    commissionService = module.get<CommissionService>(CommissionService);

    operationsService = new OperationsService(commissionService);
  });

  it('should be defined', () => {
    expect(operationsService).toBeDefined();
    expect(commissionService).toBeDefined();
  });

  it('should process cash-in operation correctly', () => {
    const operation: Operation = {
      date: '2016-01-05',
      user_id: 1,
      user_type: USER_TYPE.Natural,
      type: OPERATION_TYPE.CashIn,
      operation: { amount: 200.00, currency: CURRENCY.EUR },
    };

    const commission = operationsService.processOperation(operation);
    expect(commission).toBe(0.06);
  });

  it('should process cash-out operation for natural person correctly', () => {
    const operation: Operation = {
      date: '2016-01-06',
      user_id: 1,
      user_type: USER_TYPE.Natural,
      type: OPERATION_TYPE.CashOut,
      operation: { amount: 300.00, currency: CURRENCY.EUR },
    };

    const commission = operationsService.processOperation(operation);
    expect(commission).toBe(0);
  });

  it('should process cash-out operation for juridical person correctly', () => {
    const operation: Operation = {
      date: '2016-01-06',
      user_id: 2,
      user_type: USER_TYPE.Juridical,
      type: OPERATION_TYPE.CashOut,
      operation: { amount: 3000.00, currency: CURRENCY.EUR },
    };

    const commission = operationsService.processOperation(operation);
    expect(commission).toBe(9.00);
  });
});
