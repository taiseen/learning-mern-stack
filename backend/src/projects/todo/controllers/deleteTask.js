import taskModel from "../model/task.js";


const deleteTask = async (req, res) => {

    const id = req.params.id;

    try {

        const task = await taskModel.findByIdAndDelete(id);

        task
            ? res.status(200).json({ message: 'Task is deleted.' })
            : res.status(404).json({ message: 'No Task found by this id.' });

    } catch (err) {

        res.status(500).json({ message: 'Failed to delete task.', err });
    }
}


export default deleteTask;