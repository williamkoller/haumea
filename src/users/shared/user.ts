import { Document } from 'mongoose'

export class User extends Document {
  name: string
  email: string
  password: string
  roles: [string]
  verification: string
  verified: boolean
  verificationExpires: Date
  loginAttempts?: number
}
