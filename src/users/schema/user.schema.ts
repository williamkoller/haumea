import * as mongoose from 'mongoose'
import * as validator from 'validator'
import * as bcrypt from 'bcrypt'

export const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 6,
      maxlength: 255,
      required: [true, 'NAME_IS_BLANK'],
    },
    email: {
      type: String,
      lowercase: true,
      validate: validator.default.isEmail,
      minlength: 6,
      maxlength: 255,
      required: [true, 'EMAIL_IS_BLANK'],
    },
    password: {
      type: String,
      minlength: 5,
      maxlength: 1024,
      required: [true, 'PASSWORD_IS_BLANK'],
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verificationExpires: {
      type: Date,
      default: Date.now,
    },
    loginAttempts: {
      type: Number,
      default: 0,
    },
    roles: {
      type: [String],
      default: ['user'],
    },
  },
  {
    timestamps: true,
  },
)

UserSchema.pre('save', async function (next: mongoose.HookNextFunction) {
  try {
    if (!this.isModified('password')) {
      return next()
    }
    const hashed = await bcrypt.hash(this['password'], 10)
    this['password'] = hashed
    return next()
  } catch (error) {
    return next(error)
  }
})
