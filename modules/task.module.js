import mongoose, { Schema } from "mongoose";

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      set: function (value) {
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      },
      trim: true,
      minLength: 1,
      maxLength: 30,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
      maxLength: 500,
    },
  },
  {
    timestamps: true,
  },
);

export const Task = mongoose.model("Task", TaskSchema);
