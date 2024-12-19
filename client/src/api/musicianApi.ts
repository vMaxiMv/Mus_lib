import { IMusician } from "../interfaces/musicianInterfaces";
import api from "./api";

export const getMusiciansQuery = async (): Promise<IMusician[]> => {
    try {
      const response = await api.get<IMusician[]>("/musicians");
      return response.data;
    } catch (err) {
      console.error("Ошибка при выполнении запроса:", err);
      throw err; 
    }
  };