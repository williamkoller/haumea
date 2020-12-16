import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from './user'
import { hashPassword } from '../user.transform'
import * as bcrypt from 'bcrypt'
import { v4 } from 'uuid'
import { addHours } from 'date-fns'
import { CreateUserDto } from '../dto/create-user.dto'
import { Request } from 'express'
import { LoginUserDto } from '../dto/login-user.dto'

@Injectable()
export class UsersService {
  HOURS_TO_VERIFY = 4
  HOURS_TO_BLOCK = 6
  LOGIN_ATTEMPTS_TO_BLOCK = 5
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async getAll(): Promise<User[]> {
    const users = await this.userModel.find({}, { __v: false }).exec()
    if (users.length == 0) {
      throw new NotFoundException('There are no users.')
    }
    return users
  }

  async create(createUserSto: CreateUserDto): Promise<User> {
    const user = new this.userModel(createUserSto)
    await this.isEmailUnique(user.email)
    this.setRegistrastionUser(user)
    await user.save()
    return this.buildRegistrationInfo(user)
  }

  async login(req: Request, loginDto: LoginUserDto) {
    const user = await this.findUserByEmail(loginDto.email)
    await this.checkPassword(loginDto.password, user)
    await this.passwordsAreMatch(user)
    return {
      name: user.name,
      email: user.email,
    }
  }

  async getByEmail(user: User): Promise<any> {
    const { email } = user
    return await this.userModel.findOne({ email: email }).exec()
  }

  async getById(id: string): Promise<User> {
    return await this.userModel.findById(id).exec()
  }

  async update(id: string, user: User) {
    await this.userModel.findOneAndUpdate({ _id: id }, user).exec()
    return this.getById(id)
  }

  private async checkPassword(attempt: string, user: User) {
    const match = await bcrypt.compare(attempt, user.password)
    if (!match) {
      throw new NotFoundException('Wrong email or password')
    }
    return match
  }

  private buildRegistrationInfo(user: User): any {
    const userRegistrationInfo = {
      name: user.name,
      email: user.email,
      verified: user.verified,
    }
    return userRegistrationInfo
  }

  private async isEmailUnique(email: string) {
    const user = await this.userModel.findOne({ email, verified: true }).exec()
    if (user) {
      throw new BadRequestException('Email most be unique.')
    }
  }

  private setRegistrastionUser(user: User) {
    user.verification = v4()
    user.verificationExpires = addHours(new Date(), this.HOURS_TO_VERIFY)
  }

  private async findUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email, verified: true })
    if (!user) {
      throw new BadRequestException('Wrong email or password.')
    }
    return user
  }

  private async passwordsAreMatch(user: User): Promise<void> {
    user.loginAttempts = 0
    await user.save()
  }
}
