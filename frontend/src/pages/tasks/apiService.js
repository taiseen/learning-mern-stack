import { addTask, apiEndPoint, deleteTaskById, getAllTask, updateTaskById } from "../../api/tasks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";


export const useGetAllTask = () => {
    return useQuery({
        queryKey: [apiEndPoint],
        queryFn: getAllTask,
        // staleTime: 1000 * 10,
        retry: false,
    });
}


export const useCreateTask = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addTask,

        onSuccess: () => {
            toast.success('Task created successfully');
            queryClient.invalidateQueries({ queryKey: [apiEndPoint] });
        },

        // ✅ component re-render for refreshing latest data at ui...
        onSettled: async (_, error) => {
            error
                ? console.log(error)
                : await queryClient.invalidateQueries({ queryKey: [apiEndPoint] });
        },
    });
}


export const useUpdateTask = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateTaskById,

        onSuccess: () => {
            toast.info('Task updated successfully');
            queryClient.invalidateQueries({ queryKey: [apiEndPoint] });
        },

        // ✅ component re-render for refreshing latest data at ui...
        onSettled: async (_, error) => {
            error
                ? console.log(error)
                : await queryClient.invalidateQueries({ queryKey: [apiEndPoint] });
        },
    });
}


export const useToggleTask = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateTaskById,

        onSuccess: () => {
            toast.success('Task check toggle');
            queryClient.invalidateQueries({ queryKey: [apiEndPoint] });
        },

        // ✅ component re-render for refreshing latest data at ui...
        onSettled: async (_, error) => {
            error
                ? console.log(error)
                : await queryClient.invalidateQueries({ queryKey: [apiEndPoint] });
        },
    });
}


export const useDeleteTodo = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteTaskById,

        onSuccess: () => {
            toast.success('Task deleted successfully');
            queryClient.invalidateQueries({ queryKey: [apiEndPoint] });
        },
    });
}