import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async getTokens(userId: string, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { userId, email },
        { secret: process.env.JWT_SECRET || "supersecret", expiresIn: "15m" },
      ),
      this.jwtService.signAsync(
        { userId, email },
        {
          secret: process.env.JWT_REFRESH_SECRET || "REFRESH_SECRET",
          expiresIn: "7d",
        },
      ),
    ]);

    return { accessToken, refreshToken };
  }

  async register(email: string, password: string, userName?: string) {
    const hashed = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: { email, password: hashed, username: userName },
    });

    return { message: "User registered", userId: user.id };
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException("Invalid credentials");

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return {
      ...tokens,
      user: { id: user.id, email: user.email, username: user.username ?? null },
    };
  }

  async refresh(userId: string, refreshToken: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user || !user.hashedRefreshToken) throw new UnauthorizedException();

    const rtMatches = await bcrypt.compare(
      refreshToken,
      user.hashedRefreshToken,
    );
    if (!rtMatches) throw new UnauthorizedException("Invalid Refresh Token");

    // TẠO CẶP TOKEN MỚI (ROTATION)
    const tokens = await this.getTokens(user.id, user.email);

    // Cập nhật Refresh Token mới vào DB (ghi đè cái cũ)
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens; // Trả về cả Access và Refresh Token mới
  }

  async logout(userId: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { hashedRefreshToken: null },
    });
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.prisma.user.update({
      where: { id: userId },
      data: { hashedRefreshToken },
    });
  }
}
