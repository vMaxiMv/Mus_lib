import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { IGenre } from "../interfaces/tracksInterfaces";
import api from "./api";

  export const useGetGenresQuery = (): UseQueryResult<IGenre[], Error> => {
    return useQuery({
      queryKey: ["genres"],
      queryFn: async () => {
        const response = await api.get("/genres")
        return response.data
      }
    })
  }