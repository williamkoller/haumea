import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Req } from '@nestjs/common'
import { Request } from 'express'
import { CreateUserDto } from './dto/create-user.dto'
import { LoginUserDto } from './dto/login-user.dto'
import { User } from './shared/user'
import { UsersService } from './shared/users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAll(): Promise<User[]> {
    return await this.usersService.getAll()
  }

  @Post()
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto)
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Req() req: Request, @Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(req, loginUserDto)
  }

  @Get('/find-email')
  async getByEmail(@Body() user: User): Promise<User> {
    return await this.usersService.getByEmail(user)
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<User> {
    return await this.usersService.getById(id)
  }

  @Put(':id')
  async update(@Param('id') id: string, user: User): Promise<User> {
    return this.usersService.update(id, user)
  }
}
