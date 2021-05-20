import { Body, Controller, Post } from '@nestjs/common';

import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);

    return {
      status: 201,
      user: user,
    };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
