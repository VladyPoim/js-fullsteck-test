import { CURRENCY } from 'common/constants/currency';
import { USER_TYPE } from 'models/user/user.enum';

import { OPERATION_TYPE } from './operation.enum';

export class Operation {
  date: string;

  user_id: number;

  user_type: USER_TYPE;

  type: OPERATION_TYPE;

  operation: {
      amount: number;
      currency: CURRENCY;
    };
}
