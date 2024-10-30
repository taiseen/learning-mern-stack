import taskModel from "../model/task.js";


const updateTask = async (req, res) => {

    const id = req.params.id;
    const body = req.body;

    try {
        const taskObj = { $set: { ...body } };

        const task = await taskModel.findByIdAndUpdate(id, taskObj)

        task
            ? res.status(201).json({ message: 'Task Updated.' })
            : res.status(404).json({ message: 'No Task found by this id.' });

    } catch (err) {

        res.status(500).json({ message: 'Failed to updated task.', err });
    }
}


export default updateTask;

