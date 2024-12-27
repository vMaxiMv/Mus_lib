import { ITrackPlaylist } from "./tracksInterfaces"

export interface IPlayList {
        playlist_id: string
        name: string,
        cover_image_url: string,
        description: string,
        created_at: string,
        updated_at: string
}

export interface IPlayListDetail extends IPlayList{
        tracks: ITrackPlaylist[]
}

export interface ICreateUpdatePlaylist {
        name: string;
        description: string;
        cover_image_url: File; 
      }
