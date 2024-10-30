import taskModel from "../model/task.js";

const createTask = async (req, res) => {

    const data = req.body;

    try {
        const model = new taskModel(data);

        await model.save();

        res
            .status(201) // resource created...
            .json({ message: 'Task is created.' });

    } catch (err) {

        res
            .status(500) // internal server error...
            .json({ message: 'Failed to create task.', err });
    }
}

export default createTask;