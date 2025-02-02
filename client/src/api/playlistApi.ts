import { QueryClient, useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { IPlayList, IPlayListDetail } from "../interfaces/playlistInterface";
import api from "./api";


export const useGetPlaylistsQuery = (): UseQueryResult<IPlayList[], Error> => {
  return useQuery({
    queryKey: ['playlists'],
    queryFn: async () => {
      const response = await api.get("/playlist")
      return response.data;
    }
  })
}

  export const useGetPlaylistsDetailQuery = (playlist_id: string): UseQueryResult<IPlayListDetail, Error> => {
    return useQuery({
      queryKey: ["playlist", playlist_id],
      queryFn: async () => {
        const response = await api.get(`playlist/${playlist_id}`)
        return response.data
      },
      enabled: !!playlist_id
    })
  }



  export const useCreatePlaylistMutation = ():UseMutationResult<
    IPlayList,
    Error,
    FormData
  > => {
     const queryClient = useQueryClient()
     return useMutation({
      mutationFn: async (playlistData) => {
        const response = await api.post('/playlist/create', playlistData)
        return response.data
      },
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['playlists']})
      },
     })
  }

  export const useDeletePlaylistMutation = () => {
    return useMutation ({
      mutationFn: async (id: string) => {
        const response = await api.delete(`/playlist/delete/${id}`)
          return response.data
        }
      })
  }
