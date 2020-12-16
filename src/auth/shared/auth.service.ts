import { Injectable, UnauthorizedException } from '@nestjs/common'
import { User } from 'src/users/shared/user'
import { UsersService } from 'src/users/shared/users.service'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { JwtPayload } from '../interfaces/jwt-payload.intercate'
@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>, private readonly jwtService: JwtService) {}

  async validateUser(jwtPaylod: JwtPayload): Promise<User> {
    const user = await this.userModel.findOne({ _id: jwtPaylod.userId, verified: true })
    if (!user) {
      throw new UnauthorizedException('User not found.')
    }
    return user
  }
}
