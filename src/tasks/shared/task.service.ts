import { Injectable } from '@nestjs/common'
import { Task } from './task'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
@Injectable()
export class TaskService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}

  async getAll() {
    return await this.taskModel.find().exec()
  }

  async getById(id: string): Promise<Task> {
    const tasks = await this.taskModel.findById(id).exec()
    return tasks
  }

  async create(task: Task): Promise<Task> {
    const createdTask = new this.taskModel(task)
    return await createdTask.save()
  }

  async update(id: string, task: Task): Promise<Task> {
    await this.taskModel.findOneAndUpdate({ _id: id }, task).exec()
    return this.getById(id)
  }

  delete(id: string): Promise<void> {
    return this.taskModel.deleteOne({ _id: id }).exec()
  }
}
