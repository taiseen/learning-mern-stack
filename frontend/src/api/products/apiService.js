import { useQuery } from "@tanstack/react-query";
import { getProducts } from "./endPoints";

export const useGetAllProduct = () => {

    return useQuery({
        queryKey: ['products'],
        queryFn: getProducts,

        retry: false, // 🟩 no auto network request | by default 3 times...

        // 🟩 if in server change any data, this staleTime property always listing for new changed data
        refetchInterval: 1000 * 20 // 🟩 in every 5 second re-fetch data
    });
}
