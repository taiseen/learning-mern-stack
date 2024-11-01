import api from "./axios";

export const apiEndPoint = 'tasks';

export const getAllTask = async () => (await (api.get(apiEndPoint))).data;

export const addTask = async (obj) => await (api.post(apiEndPoint, obj)).data;

export const updateTaskById = async (obj) => await (api.put(`${apiEndPoint}/${obj._id}`, obj)).data;

export const deleteTaskById = async (obj) => await api.delete(`${apiEndPoint}/${obj._id}`);

