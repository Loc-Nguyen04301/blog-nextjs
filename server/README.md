# Cache with Redis

# Authentication & Authorization 

Định nghĩa Decorator @Public() => public những endpoint controller ko cần token

🔑 Luồng JWT + Refresh Token

1.User login → nhận accessToken (ngắn hạn, ~15 phút) và refreshToken (dài hạn, ~7 ngày).

2.refreshToken sẽ được lưu trong DB (hoặc Redis), thường sẽ hash trước khi lưu để bảo mật.

3.Khi accessToken hết hạn → client gửi refreshToken đến API /auth/refresh.

4.Server check refreshToken trong DB → nếu hợp lệ thì cấp accessToken mới.