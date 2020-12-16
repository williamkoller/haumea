import { Controller, Post, Request, UseGuards } from '@nestjs/common'
import { LocalAuthGuard } from './shared/local-auth.guard'

@Controller()
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: any) {
    return req.user
  }
}
