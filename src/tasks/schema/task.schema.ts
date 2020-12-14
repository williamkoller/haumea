import * as mongoose from 'mongoose'

export const TaskSchema = new mongoose.Schema(
  {
    description: {
      type: String,
    },
    completed: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: 'tasks',
  },
)
