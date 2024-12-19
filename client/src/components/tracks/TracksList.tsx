import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import css from './TracksList.module.css'
import { ITrackDetails } from "../../interfaces/tracksInterfaces";
import { getTracksDetailQuery } from "../../api/tracksApi";
import { Button } from "antd";
import { CreatePlantForm } from "../FormModals/CreateTrack";

interface Track {
  track_id: string;
  title: string;
  duration: string;
}

interface TracksListProps {
  tracks: Track[];
  getTracks: () => void
}

const TracksList: React.FC<TracksListProps> = ({ tracks, getTracks }) => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  

  const handleTrackClick = (id: string) => {
    navigate(`/tracks/${id}`);
  };

  const onCreate = () => {
    setVisible(false);
    getTracks()
};

  return (
    <div className={css.trackContainer}>
      <h2 className={css.trackTitle}>Список треков</h2>
      <div  className={css.addButton}>
      <Button color="default" variant="solid"  onClick={() => setVisible(true)}>
                Добавить трек
      </Button>
      <CreatePlantForm
        visible={visible}
        setVisible={setVisible}
        onCreate={onCreate}
      />
      </div>
      
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
