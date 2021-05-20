import { Controller, Get, Query } from '@nestjs/common';

import { UserQuery } from './query/userQuery';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(@Query() userQuery: UserQuery) {
    const users = await this.userService.findAll(userQuery);

    return {
      status: 200,
      users: users,
    };
  }
}
