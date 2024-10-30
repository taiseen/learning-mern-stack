import mongoose from "mongoose";
const Schema = mongoose.Schema;


const taskSchema = new Schema({

    taskName: { type: String, required: true },

    isDone: { type: Boolean, required: true }

});

const taskModel = mongoose.model('todos', taskSchema);

export default taskModel;