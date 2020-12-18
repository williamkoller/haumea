import { Injectable, UnauthorizedException } from '@nestjs/common'
import { User } from 'src/users/shared/user'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from 'src/users/shared/users.service'
@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly usersService: UsersService) {}

  async validateUser(userEmail: User): Promise<User> {
    const user = await this.usersService.getByEmail(userEmail)
    if (!user) {
      throw new UnauthorizedException('User not found.')
    }
    return user
  }

  async login(user: any) {
    const playload = {
      email: user.email,
      sub: user.id,
    }
    return {
      access_token: this.jwtService.sign(playload),
    }
  }
}
