import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { TasksModule } from './tasks/tasks.module'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://db:27017/haumea', {
      useCreateIndex: true,
      useFindAndModify: true,
      useNewUrlParser: true,
      useUnifiedTopology: false,
    }),
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
