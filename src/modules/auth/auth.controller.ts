import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { BadRequestResponse } from '../../shared/responses/badRequest.response';
import { UnauthorizedResponse } from '../../shared/responses/unauthorized.response';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UserLoginResponse } from './responses/userLogin.response';
import { UserRegisterResponse } from './responses/userRegister.response';

@ApiTags('Auth')
@Controller('')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @ApiCreatedResponse({
    description: 'the user has been created',
    type: UserRegisterResponse,
  })
  @ApiBadRequestResponse({
    description: 'validation error',
    type: BadRequestResponse,
  })
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);

    return new UserRegisterResponse(user).build();
  }

  @ApiOkResponse({ description: 'login success', type: UserLoginResponse })
  @ApiUnauthorizedResponse({
    description: 'invalid credentials',
    type: UnauthorizedResponse,
  })
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Request() req) {
    const token = await this.authService.login(req.user);

    return new UserLoginResponse(token).build();
  }
}
