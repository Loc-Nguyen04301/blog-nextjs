import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';

import { Public } from 'src/common/decorators/public.decorator';
import { JwtRefreshGuard } from 'src/common/guards/jwt-refresh.guard';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @Post('register')
  register(@Body() body: { email: string; password: string; name?: string }) {
    return this.authService.register(body.email, body.password, body.name);
  }

  @Public()
  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  refresh(@Req() req) {
    const userId = req.user.userId;
    const refreshToken = req.user.refreshToken;
    return this.authService.refresh(userId, refreshToken);
  }

  @Post('logout')
  logout(@Req() req) {
    console.log({ req })
    return this.authService.logout(req.user.userId);
  }
}
