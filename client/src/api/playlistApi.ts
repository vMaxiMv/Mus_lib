import { IMusician } from "../interfaces/musicianInterfaces";
import { ICreateUpdatePlaylist, IPlayList, IPlayListDetail } from "../interfaces/playlistInterface";
import api from "./api";

export const getPlaylistsQuery = async (): Promise<IPlayList[]> => {
    try {
      const response = await api.get<IPlayList[]>("/playlist");
      return response.data;
    } catch (err) {
      console.error("Ошибка при выполнении запроса:", err);
      throw err; 
    }
  };

  export const getPlaylistsDetailQuery = async (playlist_id: string): Promise<IPlayListDetail> => {
    try {
      const response = await api.get<IPlayListDetail>(`/playlist/${playlist_id}`);
      return response.data;
    } catch (err) {
      console.error("Ошибка при выполнении запроса:", err);
      throw err; // Передаем ошибку дальше, чтобы её можно было обработать в вызывающем коде
    }
  };


  export const createPlaylist = async (playlistData: FormData) => {
    try {
      const response = await api.post("/playlist/create", playlistData,{
         headers: {
            "Content-Type": "multipart/form-data",
        },
      });
      
      return response.data; 
    } catch (err) {
      console.error("Ошибка при создании плейлиста", err);
      throw err;
    }
  };

  export const deletePlaylist = async (id: string) => {
    try {
      const response = await api.delete(`/playlist/delete/${id}`)
      return response.data
    }
    catch (err){
      console.error ('Ошибка при удалении плейлиста', err)
      throw err
    }
  }
