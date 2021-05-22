import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  ApiTooManyRequestsResponse,
} from '@nestjs/swagger';
import { TooManyRequestsResponse } from 'src/shared/responses/tooManyRequests.response';

import { UserQuery } from './query/userQuery';
import { GetUsersResponse } from './responses/getUsers.response';
import { UserService } from './user.service';

@ApiBearerAuth()
@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiQuery({
    type: UserQuery,
  })
  @ApiOkResponse({
    description: 'return a list of users',
    type: GetUsersResponse,
  })
  @ApiTooManyRequestsResponse({
    description: 'too many requests',
    type: TooManyRequestsResponse,
  })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(@Query() userQuery: UserQuery) {
    const users = await this.userService.findAll(userQuery);

    return new GetUsersResponse(users).build();
  }
}
