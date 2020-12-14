import { Module } from '@nestjs/common'
import { TasksController } from './tasks.controller'
import { TaskService } from './shared/task.service'
import { MongooseModule } from '@nestjs/mongoose'
import { TaskSchema } from './schema/task.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Task',
        schema: TaskSchema,
      },
    ]),
  ],
  controllers: [TasksController],
  providers: [TaskService],
})
export class TasksModule {}
