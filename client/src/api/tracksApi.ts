import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { ICreateUpdateTrack, ITrackDetails, ITracks } from "../interfaces/tracksInterfaces";
import api from "./api";


export const useGetTracksQuery = (): UseQueryResult<ITracks[], Error> => {
  return useQuery({
    queryKey: ["tracks"],
    queryFn: async () => {
      const response = await api.get("/track"); 
      return response.data;
    },
  })
}

export const useGetTrackDetailsQuery = (track_id: string): UseQueryResult<ITrackDetails, Error> => {
  return useQuery({
    queryKey: ["track", track_id],
    queryFn: async () => {
      const response = await api.get(`/track/${track_id}`);
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
    mutationFn: async (trackData) => {
      const response = await api.post("/track/create", trackData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tracks"] });
    },
  });
};


export const useUpdateTrackMutation = (): UseMutationResult<
  ITracks,
  Error,
  { id: string; trackData: ICreateUpdateTrack }
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, trackData }) => {
      const response = await api.patch(`/track/update/${id}`, trackData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["track"] });
    },
  });
};


export const useDeleteTrackMutation = (): UseMutationResult<void, Error, string> => {
  return useMutation ({
    mutationFn: async (id: string) => {
      const response = await api.delete(`/track/delete/${id}`);
      return response.data;
    },
  });
};
