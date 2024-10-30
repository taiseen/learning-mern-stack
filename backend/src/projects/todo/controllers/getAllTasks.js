import taskModel from "../model/task.js";


const getAllTasks = async (_, res) => {

    try {

        const tasks = await taskModel.find({});

        res.status(200).json({ message: 'All Tasks.', tasks });

    } catch (err) {

        res.status(500).json({ message: 'Failed to get all tasks.', err });
    }
}


export default getAllTasks;