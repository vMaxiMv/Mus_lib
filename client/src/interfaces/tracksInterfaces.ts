export interface ITracks{
  track_id: string;
  title: string;
  duration: string;
  musician_id: string;
  created_at: string; 
  updated_at: string; 
  album_id: string | null; 
}

export interface ITrackDetails extends ITracks{
  musician: IMusician;
  album: IAlbum | null;
  genres: IGenre[]
}

export interface IMusician {
  musician_id: string;
  name: string;
  country: string;
}

export interface IAlbum {
  album_id: string;
  title: string;
  release_year: number;
  cover_image_url: string;
}

export interface IGenre {
  genre_id: string;
  genre_name: string;
}

export interface ICreateUpdateTrack{
  title: string;
  duration: string;
  musician_id: string;
  genres: IGenre[]
}

export interface ITrackPlaylist{
  track_id: string;
  title: string;
  duration: string
}