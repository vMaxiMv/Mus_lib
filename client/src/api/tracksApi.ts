import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { ICreateUpdateTrack, ITrackDetails, ITracks } from "../interfaces/tracksInterfaces";
import api from "./api";


export const useGetTracksQuery = () => {
  return useQuery<ITracks[], Error>({
    queryKey: ["tracks"],
    queryFn: async () => {
      const response = await api.get<ITracks[]>("/track"); 
      return response.data;
    },
  })
}

export const useGetTrackDetailsQuery = (track_id: string): UseQueryResult<ITrackDetails, Error> => {
  return useQuery<ITrackDetails, Error>({
    queryKey: ["track", track_id],
    queryFn: async () => {
      const response = await api.get<ITrackDetails>(`/track/${track_id}`);
      return response.data;
    },
    enabled: !!track_id, // Отключает запрос, если track_id не задан
  });
};


export const useCreateTrackMutation = (): UseMutationResult<
  ICreateUpdateTrack,
  Error,
  ICreateUpdateTrack
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (trackData: ICreateUpdateTrack) => {
      const response = await api.post<ICreateUpdateTrack>("/track/create", trackData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tracks"] });
    },
  });
};


export const useUpdateTrackMutation = (): UseMutationResult<
  void,
  Error,
  { id: string; trackData: ICreateUpdateTrack }
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, trackData }: { id: string; trackData: ICreateUpdateTrack }) => {
      const response = await api.patch<void>(`/track/update/${id}`, trackData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["track"] });
    },
  });
};


export const useDeleteTrackMutation = (): UseMutationResult<void, Error, string> => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete<void>(`/track/delete/${id}`);
      return response.data;
    },
  });
};
