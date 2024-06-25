import { Module } from '@nestjs/common';
import { UserService } from './user.service.ts';

@Module({
  providers: [UserService],
})
export class UserModule {}
