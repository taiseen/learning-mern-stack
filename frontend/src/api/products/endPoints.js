import api from "..";

export const getProducts = async ({ queryKey }) => (await api.get(queryKey[0])).data;