// src/auth/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('register')
  async register(@Body() data: any) {
    // Log user registration attempt
    console.log('Registering user:', data);
  }
}
