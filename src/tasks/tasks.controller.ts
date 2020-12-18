import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../auth/shared/jwt-auth.guard'
import { Task } from './shared/task'
import { TaskService } from './shared/task.service'

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAll(): Promise<Task[]> {
    return await this.taskService.getAll()
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Task> {
    return await this.taskService.getById(id)
  }

  @Post()
  async create(@Body() task: Task): Promise<Task> {
    return await this.taskService.create(task)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() task: Task): Promise<Task> {
    return await this.taskService.update(id, task)
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string } | void> {
    await this.taskService.delete(id)
    return {
      message: 'Task deleted successfully',
    }
  }
}
