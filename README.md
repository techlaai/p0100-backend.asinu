# Asinu Backend API

Backend Node.js/Express cho ứng dụng Asinu - Hỗ trợ theo dõi sức khỏe.

## Cấu trúc thư mục

```
src/
├── controllers/     # Xử lý request/response
│   ├── auth.controller.js        # Đăng ký, đăng nhập (email, social, phone)
│   ├── careCircle.controller.js  # Quản lý vòng tròn chăm sóc
│   ├── carePulse.controller.js   # Care Pulse engine
│   ├── chat.controller.js        # AI Chat
│   ├── missions.controller.js    # Nhiệm vụ hàng ngày
│   ├── mobile.controller.js      # Logs sức khỏe
│   ├── onboarding.controller.js  # Onboarding profile
│   ├── profile.controller.js     # User profile
│   └── tree.controller.js        # Health score/tree
├── middleware/
│   └── auth.js                   # JWT authentication
├── routes/
│   ├── auth.routes.js            # /api/auth/*
│   ├── careCircle.routes.js      # /api/care-circle/*
│   ├── carePulse.routes.js       # /api/care-pulse/*
│   └── mobile.routes.js          # /api/mobile/*
├── services/
│   ├── carePulseAps.js           # Care Pulse APS engine
│   ├── chatProvider.js           # AI chat providers (Gemini, DiaBrain)
│   ├── missionsService.js        # Missions logic
│   └── ai/providers/diabrain.js  # DiaBrain AI provider
└── validation/
    └── schemas.js                # Zod validation schemas
```

## API Endpoints

### Authentication (`/api/auth`)
- `POST /email/register` - Đăng ký bằng email
- `POST /email/login` - Đăng nhập bằng email  
- `POST /google` - Đăng nhập bằng Google
- `POST /apple` - Đăng nhập bằng Apple
- `POST /zalo` - Đăng nhập bằng Zalo
- `POST /phone-login` - Đăng nhập bằng số điện thoại
- `GET /me` - Lấy thông tin user hiện tại
- `POST /verify` - Xác minh token
- `DELETE /me` - Xóa tài khoản

### Mobile (`/api/mobile`)
- `POST /logs` - Tạo log sức khỏe (glucose, bp, weight, water, meal, insulin, medication)
- `GET /logs` - Lấy danh sách logs gần đây
- `GET /logs/recent` - Alias cho /logs
- `POST /chat` - Gửi tin nhắn đến AI
- `GET /missions` - Lấy danh sách nhiệm vụ
- `POST /onboarding` - Cập nhật hồ sơ onboarding
- `GET /profile` - Lấy profile người dùng
- `PUT /profile` - Cập nhật profile
- `DELETE /profile` - Xóa tài khoản
- `GET /tree` - Lấy health score summary
- `GET /tree/history` - Lấy lịch sử health score

### Care Pulse (`/api/care-pulse`)
- `POST /events` - Gửi sự kiện Care Pulse
- `GET /state` - Lấy trạng thái Care Pulse hiện tại
- `POST /escalations/ack` - Xác nhận cảnh báo

### Care Circle (`/api/care-circle`)
- `POST /invitations` - Tạo lời mời kết nối
- `GET /invitations` - Lấy danh sách lời mời
- `POST /invitations/:id/accept` - Chấp nhận lời mời
- `POST /invitations/:id/reject` - Từ chối lời mời
- `GET /connections` - Lấy danh sách kết nối
- `DELETE /connections/:id` - Xóa kết nối

## Cài đặt

1. Copy `.env.example` sang `.env` và điền các giá trị
2. Chạy database migrations:
```bash
npm run start
```

## Chạy development

```bash
npm run start
```

Server sẽ chạy ở `http://localhost:3000`

## Database

Sử dụng PostgreSQL. Schema được định nghĩa trong:
- `db/init.sql` - Schema cơ bản
- `db/migrations/` - Các migrations bổ sung

## Environment Variables

Xem file `.env.example` để biết danh sách các biến môi trường cần thiết.
