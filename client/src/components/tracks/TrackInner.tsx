import React from "react";
import { useNavigate } from "react-router-dom";
import css from './TracksList.module.css'

interface Track {
  track_id: string;
  title: string;
  duration: string;
}

interface TracksListProps {
  tracks: Track[];
}

const TracksList: React.FC<TracksListProps> = ({ tracks }) => {
  const navigate = useNavigate();

  const handleTrackClick = (id: string) => {
    navigate(`/tracks/${id}`);
  };

  return (
    <div className={css.trackContainer}>
      <h2 className={css.trackTitle}>Список треков</h2>
      <div className={css.tracksList}>
        {tracks.map((track) => (
          <div
            key={track.track_id}
            className={css.trackItem}
            onClick={() => handleTrackClick(track.track_id)}
          >
            <span className={css.trackListName}>{track.title}</span>
            <span className={css.trackDuration}>{track.duration}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TracksList;
