import {
  Schema,
  models,
  model,
  type Model,
  type InferSchemaType,
} from "mongoose";

const userSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  ip: {
    type: String,
  },
  accessCount: {
    type: Number,
  },
  isPublic: {
    type: Boolean,
    default: true,
  },
  password: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 3,
  },
});

type UserDoc = InferSchemaType<typeof userSchema>;

const User =
  (models.User as Model<UserDoc>) || model<UserDoc>("User", userSchema);

export type { UserDoc };
export { User };
