import { Injectable } from '@nestjs/common';

import { CommissionService } from 'models/commission/commission.service.ts';

import { getWeekKey } from '../../common/helpers/date.helper.ts';
import { USER_TYPE } from '../user/user.enum.ts';

import { Operation } from './operation.entity.ts';
import { OPERATION_TYPE } from './operation.enum.ts';

@Injectable()
export class OperationsService {
  private userCashOutHistory: { [key: number]: { [key: string]: number } } = {};

  constructor(private readonly commissionService: CommissionService) {}

  processOperation(operation: Operation): number {
    if (operation.type === OPERATION_TYPE.CashIn) {
      return this.processCashIn(operation);
    } if (operation.type === OPERATION_TYPE.CashOut) {
      return this.processCashOut(operation);
    }
    throw new Error('Unsupported operation type');
  }

  private processCashIn(operation: Operation): number {
    return this.commissionService.calculateCashInCommission(operation.operation.amount);
  }

  private processCashOut(operation: Operation): number {
    if (operation.user_type === USER_TYPE.Natural) {
      const weekKey = getWeekKey(operation.date);
      const userId = operation.user_id;

      if (!this.userCashOutHistory[userId]) {
        this.userCashOutHistory[userId] = {};
      }

      if (!this.userCashOutHistory[userId][weekKey]) {
        this.userCashOutHistory[userId][weekKey] = 0;
      }

      const commission = this.commissionService.calculateNaturalPersonCashOutCommission(
        operation.operation.amount,
        this.userCashOutHistory[userId][weekKey],
      );

      this.userCashOutHistory[userId][weekKey] += operation.operation.amount;

      return commission;
    } if (operation.user_type === USER_TYPE.Juridical) {
      const { calculateLegalPersonCashOutCommission } = this.commissionService;
      return calculateLegalPersonCashOutCommission(operation.operation.amount);
    }
    throw new Error(`Unsupported user_type: ${operation.user_type}`);
  }
}
