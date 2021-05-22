import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  ApiTooManyRequestsResponse,
} from '@nestjs/swagger';

import { UserQuery } from './query/userQuery';
import { UserService } from './user.service';

@ApiBearerAuth()
@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiQuery({
    type: UserQuery,
  })
  @ApiOkResponse({ description: 'return a list of users' })
  @ApiTooManyRequestsResponse({ description: 'too many requests' })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(@Query() userQuery: UserQuery) {
    const users = await this.userService.findAll(userQuery);

    return {
      status: 200,
      users: users,
    };
  }
}
