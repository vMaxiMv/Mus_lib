import { IGenre } from "../interfaces/tracksInterfaces";
import api from "./api";

export const getGenresQuery = async (): Promise<IGenre[]> => {
    try {
      const response = await api.get<IGenre[]>("/genres");
      return response.data;
    } catch (err) {
      console.error("Ошибка при выполнении запроса:", err);
      throw err; 
    }
  };