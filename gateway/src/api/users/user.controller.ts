import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterUserDTO } from './dto/register-user.dto';
import { EmailDTO } from './dto/email.dto';
import UserService from './user.service';
import { LoginDTO } from './dto/login.dto';
import { Request, Response } from 'express';
import { CookieUtils } from 'src/utils/cookie-utils';
import { Tokens } from 'src/utils/interfaces/tokens';
import { lastValueFrom } from 'rxjs';
import { TokenDTO } from './dto/token.dto';
import { AuthGuard } from 'src/security/auth.guard';

@ApiTags('Authorization')
@Controller('users')
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Register new user' })
  @Post()
  async register(@Body() data: RegisterUserDTO) {
    return this.userService.registerUser(data);
  }

  @ApiOperation({ summary: 'Request email verification of user' })
  @Post('/email/request-verification')
  async requestEmailVerification(@Body() data: EmailDTO) {
    return this.userService.requestEmailVerification(data);
  }

  @ApiOperation({ summary: 'Verify user email by token' })
  @Post('/email/verify')
  async verifyUserEmail(
    @Body() data: TokenDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    const tokens: Tokens = await lastValueFrom(
      await this.userService.verifyUserEmail(data),
    );
    CookieUtils.setRefreshToken(response, tokens.refreshToken);
    return { token: tokens.accessToken };
  }

  @ApiOperation({ summary: 'Login user' })
  @Post('/login')
  async loginUser(
    @Body() data: LoginDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    const tokens: Tokens = await lastValueFrom(
      await this.userService.loginUser(data),
    );
    CookieUtils.setRefreshToken(response, tokens.refreshToken);
    return { token: tokens.accessToken };
  }

  @ApiOperation({ summary: 'Refresh user token' })
  @Post('/refresh')
  async refreshToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const token = CookieUtils.getRefreshToken(request);
    const tokens: Tokens = await lastValueFrom(
      await this.userService.refreshToken(token),
    );
    CookieUtils.setRefreshToken(response, tokens.refreshToken);
    return { token: tokens.accessToken };
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get current user from token' })
  @Get('/me')
  async getCurrentUser(@Req() request: Request) {
    const token = this.userService.extractTokenFromRequest(request);
    return this.userService.getCurrentUser(token);
  }
}
