import { Schema, models, model } from "mongoose";

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
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 3,
  },
});

const User = models.User || model("User", userSchema);

export { User };
