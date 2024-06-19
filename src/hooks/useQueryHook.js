import { useQuery } from "@tanstack/react-query"

export const useCustomQuery = (queryKey, fun) => {
    const { data: response } = useQuery({
        queryKey: [queryKey],
        queryFn: async() => await fun
    })
    return { response }
}