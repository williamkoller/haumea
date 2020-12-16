import { AuthModule } from './auth/auth.module'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { TasksModule } from './tasks/tasks.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://db:27017/haumea', {
      useCreateIndex: true,
      useFindAndModify: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    AuthModule,
    TasksModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
