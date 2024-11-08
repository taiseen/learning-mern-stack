import { useCreateTask, useGetAllTask, useUpdateTask } from '../../api/tasks/apiService';
import { FaPencilAlt, FaPlus, FaSearch } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import debounce from 'debounce';
import Task from './Task';


const TaskManager = () => {

    const { register, handleSubmit, reset, getValues, setValue, formState: { errors } } = useForm(); // custom hook by lib...


    const taskName = 'taskName';
    const [allTask, setAllTask] = useState([]); // for local searching purposes
    const [updateTask, setUpdateTask] = useState(null);
    const [filteredTasks, setFilteredTasks] = useState(allTask); // for local searching purposes


    const { data, isLoading, isError, error } = useGetAllTask();


    const { mutate: createMutate } = useCreateTask();
    const { mutate: updateMutate } = useUpdateTask();


    useEffect(() => {
        // for local searching purposes
        setAllTask(data?.tasks)
        setFilteredTasks(data?.tasks)
    }, [data?.tasks]);


    const handleTaskCreate = (inputObj) => {

        if (updateTask) {
            const updatedValue = getValues(taskName);
            const taskObj = { ...updateTask, taskName: updatedValue };
            updateMutate(taskObj);
        } else {
            const taskObj = { ...inputObj, isDone: false };
            createMutate(taskObj)
        }

        setUpdateTask(null);
        reset();
    }


    const handleTaskSearch = (e) => {
        const searchTask = e.target.value.toLowerCase();

        const result = allTask.filter(obj =>
            searchTask === ""
                ? true // Display all tasks if the search term is empty
                : obj.taskName.toLowerCase().includes(searchTask)
        );

        setFilteredTasks(result); // for local searching purposes
    };


    if (isError) {
        return (
            <div className='h-screen bg-slate-800 flex items-center justify-center text-5xl text-slate-400'>
                {error.message}
            </div>
        )
    }


    if (isLoading) {
        return (
            <div className='h-screen bg-slate-800 flex items-center justify-center text-5xl text-slate-400'>
                Loading...
            </div>
        )
    }


    return (
        <section className="h-screen bg-slate-800 text-gray-300 flex items-center justify-center">


            <div className="w-[700px] p-4 rounded-sm bg-slate-700 flex flex-col gap-3">

                <h1 className='text-center text-3xl mb-2'>Task Management | CRUD operations</h1>

                <div className="flex gap-5 items-center justify-center">

                    <form
                        className="w-1/2 flex items-center"
                        onSubmit={handleSubmit(handleTaskCreate)}
                    >
                        <input
                            autoFocus
                            type="text"
                            className={`w-full p-2 rounded-l-sm outline-none text-black text-xl
                                ${errors[taskName] ? 'placeholder:text-red-500' : ''}
                            `}
                            placeholder={`${errors[taskName]
                                ? errors[taskName].message
                                : "Enter new task..."}`
                            }
                            {...register(taskName, {
                                required: { value: true, message: 'This field is required' },
                                minLength: { value: 2, message: 'Minimum length 2' },
                            })}
                        />

                        <button
                            type='submit'
                            className={`p-3.5 rounded-r-sm  text-slate-700 duration-300
                                ${updateTask
                                    ? 'bg-orange-300 hover:bg-orange-500'
                                    : 'bg-green-400 hover:bg-green-500'}`
                            }
                        >
                            {updateTask ? <FaPencilAlt /> : <FaPlus />}
                        </button>
                    </form>

                    <div className="w-1/2 flex items-center">
                        <input
                            type="search"
                            placeholder="Search task..."
                            className="w-full p-2 rounded-l-sm outline-none text-black text-xl"
                            onChange={debounce((e) => handleTaskSearch(e), 300)}
                        />

                        <button className='p-3.5 rounded-r-sm bg-violet-400 text-slate-700'>
                            <FaSearch />
                        </button>
                    </div>

                </div>


                <div className="flex flex-col gap-3 mt-4">
                    {
                        filteredTasks?.length > 0
                            ? (
                                filteredTasks.map((obj, idx) =>
                                    <Task
                                        key={idx}
                                        obj={obj}
                                        setValue={setValue}
                                        updateTask={updateTask}
                                        setUpdateTask={setUpdateTask}
                                    />
                                )
                            )
                            : (
                                <div className="text-2xl text-orange-500 bg-slate-800 p-2 rounded-sm text-center">
                                    No Task Found...
                                </div>
                            )
                    }
                </div>

            </div>
        </section>
    )
}

export default TaskManager