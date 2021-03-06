import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import { mongoConstants } from './config/constants';
import { AuthModule } from './modules/auth/auth.module';
import { ToolModule } from './modules/tool/tool.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ToolModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(mongoConstants.uri, {
      useCreateIndex: true,
      useNewUrlParser: true,
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 15,
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class MainModule {}
