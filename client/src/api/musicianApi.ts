import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { IMusician } from "../interfaces/musicianInterfaces";
import api from "./api";


export const useGetMusiciansQuery = (): UseQueryResult<IMusician[], Error> => {
  return useQuery({
    queryKey: ["musicians"],
    queryFn: async () => {
     const response = await api.get('/musicians')
     return response.data
    }
  })
}