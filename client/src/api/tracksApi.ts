import { ICreateUpdateTrack, ITrackDetails, ITracks } from "../interfaces/tracksInterfaces";
import api from "./api";

export const getTracksQuery = async (): Promise<ITracks[]> => {
  try {
    const response = await api.get<ITracks[]>("/track");
    return response.data;
  } catch (err) {
    console.error("Ошибка при выполнении запроса:", err);
    throw err; // Передаем ошибку дальше, чтобы её можно было обработать в вызывающем коде
  }
};

export const getTracksDetailQuery = async (track_id: string): Promise<ITrackDetails> => {
  try {
    const response = await api.get<ITrackDetails>(`/track/${track_id}`);
    return response.data;
  } catch (err) {
    console.error("Ошибка при выполнении запроса:", err);
    throw err; // Передаем ошибку дальше, чтобы её можно было обработать в вызывающем коде
  }
};

export const createTrack = async (trackData:ICreateUpdateTrack) => {
  try {
    const response = await api.post("/track/create", trackData);
    return response.data;
  } catch (err) {
    console.error("Ошибка при добавлении трека", err);
    throw err;
  }
};

export const updateTrack = async (id:string, trackData:ICreateUpdateTrack) => {
  try {
    const response = await api.patch(`/track/update/${id}`, trackData);
    return response.data;
  } catch (err) {
    console.error("Ошибка при обновлении трека", err);
    throw err;
  }
};


export const deleteTrack = async (id:string) => {
  try {
    const response = await api.delete(`/track/${id}`);
    return response.data;
  } catch (err) {
    console.error("Ошибка при удалении трека", err);
    throw err;
  }
};