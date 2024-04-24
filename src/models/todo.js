import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  desc: {
    type: String,
    required: true,
  },
  completed: { type: Boolean, default: false },
});

const Todo = mongoose.model.todo || mongoose.model("todo", TodoSchema);

export default Todo;
