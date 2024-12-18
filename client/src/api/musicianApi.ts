import { IMusician } from "../interfaces/tracksInterfaces";
import api from "./api";

export const getMusiciansQuery = async (): Promise<IMusician[]> => {
    try {
      const response = await api.get<IMusician[]>("/track");
      return response.data;
    } catch (err) {
      console.error("Ошибка при выполнении запроса:", err);
      throw err; 
    }
  };