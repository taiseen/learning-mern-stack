import { useDeleteTodo, useToggleTask } from '../../api/tasks/apiService';
import { FaCheck, FaPencilAlt, FaTrash } from 'react-icons/fa';



const Task = ({ obj, setValue, setUpdateTask, updateTask }) => {

    const { mutate: deleteMutate } = useDeleteTodo();
    const { mutate: toggleMutate } = useToggleTask();


    const handleTaskDelete = (obj) => {
        if (confirm('Are you sure to want delete this task?')) {
            deleteMutate(obj);
        }
    };


    const handleTaskCheckToggle = (obj) => {
        const taskToggle = { ...obj, isDone: !obj.isDone };
        toggleMutate(taskToggle);
    };


    const handleTaskUpdate = (obj) => {
        setValue('taskName', obj.taskName);
        setUpdateTask(obj);
    }


    return (
        <div

            className="bg-slate-800 flex gap-2 p-2 rounded-sm"
        >

            <p className={`flex-1 text-2xl ${obj.isDone ? 'line-through text-green-600' : ''}`}>
                {obj.taskName}
            </p>


            <div className="flex gap-2 items-center text-slate-700">
                <button
                    className={`p-2 rounded-sm duration-300 
                        ${updateTask
                            ? 'cursor-not-allowed bg-slate-900'
                            : 'bg-green-300 hover:bg-green-500'}`
                    }
                    onClick={() => handleTaskCheckToggle(obj)}
                    disabled={!!updateTask}
                >
                    <FaCheck />
                </button>

                <button
                    className='p-2 rounded-sm duration-300 bg-orange-300 hover:bg-orange-500'
                    onClick={() => handleTaskUpdate(obj)}
                >
                    <FaPencilAlt />
                </button>

                <button
                    className='p-2 rounded-sm duration-300 bg-red-400 hover:bg-red-500'
                    onClick={() => handleTaskDelete(obj)}
                >
                    <FaTrash />
                </button>
            </div>
        </div>
    )
}

export default Task