import { Module } from '@nestjs/common';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [],
  // exports: [],
  // imports: [],
})
export class UserModule {}
