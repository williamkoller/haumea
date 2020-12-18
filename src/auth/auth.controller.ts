import { Controller, Post, Request, UseGuards } from '@nestjs/common'
import { AuthService } from './shared/auth.service'
import { LocalAuthGuard } from './shared/local-auth.guard'

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: any) {
    return await this.authService.login(req.user)
  }
}
