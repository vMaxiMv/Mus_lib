import { ITracks } from "../interfaces/tracksInterfaces";
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