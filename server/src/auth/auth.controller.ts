import { Controller, Post, Body, UseGuards, Req, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Response } from "express";

import { Public } from "src/common/decorators/public.decorator";
import { JwtRefreshGuard } from "src/common/guards/jwt-refresh.guard";

@Controller("api/v1/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post("register")
  register(@Body() body: { email: string; password: string; name?: string }) {
    return this.authService.register(body.email, body.password, body.name);
  }

  @Public()
  @Post("login")
  async login(
    @Body() body: { email: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken, user } = await this.authService.login(
      body.email,
      body.password,
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // 👉 production: true (HTTPS)
      sameSite: "lax", // hoặc "strict"
      path: "/api/v1/auth/refresh", // chỉ gửi khi gọi refresh
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
    });

    return { accessToken, user };
  }

  @Public()
  @UseGuards(JwtRefreshGuard)
  @Post("refresh")
  async refresh(
    @Req() req,
    @Res({ passthrough: true }) res: Response, // Thêm Res để ghi đè Cookie
  ) {
    // req.user này ở đâu ra => lấy từ validate() trong JwtRefreshStrategy, sau khi đã verify thành công JWT trong Cookie
    const userId = req.user.userId;
    const refreshToken = req.user.refreshToken;

    // Gọi service để lấy cặp token mới
    const tokens = await this.authService.refresh(userId, refreshToken);

    // Ghi đè Refresh Token mới vào Cookie
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: false, // production: true
      sameSite: "lax",
      path: "/api/v1/auth/refresh",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    // Chỉ trả accessToken về body cho FE lưu LocalStorage
    return {
      accessToken: tokens.accessToken,
    };
  }

  @Post("logout")
  logout(@Req() req) {
    return this.authService.logout(req.user.id);
  }
}
