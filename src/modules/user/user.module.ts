import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { IsEmailAlreadyInUseConstraint } from './decorators/isEmailAlreadyInUse';
import { User, UserSchema } from './schemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, IsEmailAlreadyInUseConstraint],
  exports: [
    UserService,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class UserModule {}
