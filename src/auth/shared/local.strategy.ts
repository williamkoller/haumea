import { Injectable, UnauthorizedException } from '@nestjs/common'
import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { User } from 'src/users/shared/user'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    })
  }

  async validate(userEmail: User): Promise<any> {
    const user = await this.authService.validateUser(userEmail)
    console.log(user)
    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
